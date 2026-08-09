import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { ACADEMY_CONFIG } from '@/constants/config';
import { CheckIcon, WhatsAppIcon, ArrowRightIcon } from './icons';

interface ContactFormProps {
  onSuccess?: () => void;
}

export interface ContactFormRef {
  setSelectedMode: (mode: 'Online' | 'Offline' | 'Not Sure') => void;
}

const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(({ onSuccess }, ref) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedClass, setSelectedClass] = useState<'Online' | 'Offline' | 'Not Sure'>('Not Sure');
  const [message, setMessage] = useState('');

  // Validation & Success State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Expose function to allow parent components to pre-select class mode
  useImperativeHandle(ref, () => ({
    setSelectedMode(mode) {
      setSelectedClass(mode);
    },
  }));

  const handleClassSelect = (mode: 'Online' | 'Offline' | 'Not Sure') => {
    setSelectedClass(mode);
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (phone.trim().length < 8) {
      tempErrors.phone = 'Please enter a valid phone number';
    }
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSelectedClass('Not Sure');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Reservation · Admissions</Text>
          </View>
          <Text style={styles.title}>Reserve your seat</Text>
          <Text style={styles.subtitle}>
            Fill out the form below to secure your registration. Our learning consultants will reach out to you within 24 hours.
          </Text>
        </View>

        <View style={[styles.layoutRow, isMobile && styles.layoutRowMobile]}>
          {/* Left: Form Box (cream card) */}
          <View style={styles.formCard}>
            {submitted ? (
              <View style={styles.successContainer}>
                <View style={styles.successIconCircle}>
                  <CheckIcon size={32} color="#0a0a0a" />
                </View>
                <Text style={styles.successTitle}>Reservation Requested!</Text>
                <Text style={styles.successDesc}>
                  Thank you, <Text style={styles.boldText}>{name}</Text>. Your request has been successfully received. We will contact you on <Text style={styles.boldText}>{phone}</Text> or <Text style={styles.boldText}>{email}</Text> shortly.
                </Text>
                <TouchableOpacity
                  onPress={handleReset}
                  style={styles.resetButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.resetButtonText}>Reserve Another Seat</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formInner}>
                {/* Input 1: Name */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#8a8a84"
                    style={[styles.textInput, errors.name ? styles.inputError : null]}
                  />
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

                {/* Row: Phone & Email */}
                <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                  <View style={styles.flexOne}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      placeholder="e.g., +91 98765 43210"
                      placeholderTextColor="#8a8a84"
                      style={[styles.textInput, errors.phone ? styles.inputError : null]}
                    />
                    {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                  </View>

                  <View style={styles.flexOne}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="e.g., you@domain.com"
                      placeholderTextColor="#8a8a84"
                      style={[styles.textInput, errors.email ? styles.inputError : null]}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                  </View>
                </View>

                {/* Segmented Selector: Class Mode */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Class Mode Preference</Text>
                  <View style={styles.segmentedContainer}>
                    {(['Online', 'Offline', 'Not Sure'] as const).map((mode) => {
                      const isActive = selectedClass === mode;
                      return (
                        <TouchableOpacity
                          key={mode}
                          onPress={() => handleClassSelect(mode)}
                          style={[styles.segmentedBtn, isActive && styles.segmentedBtnActive]}
                          activeOpacity={0.8}
                        >
                          <Text style={[styles.segmentedBtnText, isActive && styles.segmentedBtnTextActive]}>
                            {mode}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Input: Message */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Questions / Special Requests (Optional)</Text>
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                    placeholder="Tell us about your learning goals or specific requirements..."
                    placeholderTextColor="#8a8a84"
                    style={[styles.textInput, styles.textArea]}
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitButton}
                  activeOpacity={0.9}
                >
                  <Text style={styles.submitButtonText}>Request Reservation</Text>
                  <View style={styles.arrowCircle}>
                    <ArrowRightIcon size={10} color="#ffffff" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Right: Info Cards (black card) */}
          <View style={[styles.infoCol, isMobile && styles.infoColMobile]}>
            <View style={styles.infoBox}>
              <View style={styles.iconCircle}>
                <WhatsAppIcon size={26} color="#fde351" />
              </View>
              <Text style={styles.infoTitle}>Connect directly</Text>
              <Text style={styles.infoDesc}>
                Have quick questions before enrolling? Connect directly with Trainer Alisha Ahmed via WhatsApp for instant query resolution.
              </Text>

              {/* WhatsApp CTA Card */}
              <View style={styles.whatsappCard}>
                <Text style={styles.whatsappLabel}>WhatsApp Helpline</Text>
                <Text style={styles.whatsappNumber}>+91 {ACADEMY_CONFIG.PHONE_NUMBER}</Text>
                <Text style={styles.whatsappText}>
                  Standard response time is within 1 hour. Open Monday to Saturday.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebe9e1',
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4d6',
  },
  contentInner: {
    maxWidth: 1080,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 56,
    textAlign: 'center',
  },
  eyebrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  eyebrowText: {
    color: '#6a6a64',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0a0a0a',
    fontSize: clamp(34, 4.4, 52),
    fontWeight: '800',
    lineHeight: clamp(36, 4.6, 56),
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1.5,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  },
  subtitle: {
    color: '#6a6a64',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 600,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  layoutRow: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'flex-start',
  },
  layoutRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  formCard: {
    flex: 1.3,
    backgroundColor: '#f6f3eb',
    borderRadius: 28,
    padding: 40,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
        boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04), 0 16px 28px -8px rgba(40, 40, 30, 0.06)',
      } as any,
    }),
  },
  formInner: {
    zIndex: 1,
  },
  formGroup: {
    marginBottom: 24,
    width: '100%',
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    width: '100%',
  },
  formRowMobile: {
    flexDirection: 'column',
    gap: 24,
    marginBottom: 24,
  },
  flexOne: {
    flex: 1,
  },
  inputLabel: {
    color: '#0a0a0a',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8e4d6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#0a0a0a',
    fontSize: 14.5,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8e4d6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segmentedBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  segmentedBtnActive: {
    backgroundColor: '#0a0a0a',
  },
  segmentedBtnText: {
    color: '#6a6a64',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  segmentedBtnTextActive: {
    color: '#ffffff',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fde351',
    borderWidth: 1,
    borderColor: '#d8b020',
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 12,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #ffe760 0%, #fde351 55%, #f7d130 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 -1px 2px rgba(180, 140, 30, 0.3) inset',
        cursor: 'pointer',
      } as any,
    }),
  },
  submitButtonText: {
    color: '#0a0a0a',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  arrowCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fde351',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d8b020',
    marginBottom: 20,
  },
  successTitle: {
    color: '#0a0a0a',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  successDesc: {
    color: '#6a6a64',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 450,
    marginBottom: 32,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  boldText: {
    color: '#0a0a0a',
    fontWeight: '700',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#e8e4d6',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  resetButtonText: {
    color: '#0a0a0a',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  infoCol: {
    flex: 0.7,
  },
  infoColMobile: {
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#0a0a0a',
    borderRadius: 28,
    padding: 36,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(253, 227, 81, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  infoDesc: {
    color: '#8a8a84',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  whatsappCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  whatsappLabel: {
    color: '#fde351',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  whatsappNumber: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  whatsappText: {
    color: '#8a8a84',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}

export default ContactForm;
