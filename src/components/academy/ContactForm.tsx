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
          {/* Left: Form Box (glowing charcoal) */}
          <View style={styles.formCard}>
            {/* Glow Backdrops - Novabrew-style */}
            <View style={styles.glowTopRight} />

            {submitted ? (
              <View style={styles.successContainer}>
                <View style={styles.successIconCircle}>
                  <CheckIcon size={32} color="#FFFFFF" />
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
              <View style={styles.form}>
                {/* Full Name */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Enter your full name"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={name}
                    onChangeText={setName}
                  />
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

                {/* Phone & Email */}
                <View style={[styles.fieldRow, isMobile && styles.fieldRowMobile]}>
                  <View style={[styles.fieldGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Phone Number *</Text>
                    <TextInput
                      style={[styles.input, errors.phone && styles.inputError]}
                      placeholder="Enter phone number"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                    {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                  </View>

                  <View style={[styles.fieldGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Email Address *</Text>
                    <TextInput
                      style={[styles.input, errors.email && styles.inputError]}
                      placeholder="Enter email address"
                      placeholderTextColor="rgba(255, 255, 255, 0.3)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                  </View>
                </View>

                {/* Preferred Class Mode */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Preferred Class Mode</Text>
                  <View style={styles.selectorRow}>
                    {(['Online', 'Offline', 'Not Sure'] as const).map((mode) => {
                      const isSelected = selectedClass === mode;
                      return (
                        <TouchableOpacity
                          key={mode}
                          onPress={() => handleClassSelect(mode)}
                          style={[
                            styles.selectorItem,
                            isSelected && styles.selectorItemActive,
                          ]}
                          activeOpacity={0.8}
                        >
                          <Text
                            style={[
                              styles.selectorText,
                              isSelected && styles.selectorTextActive,
                            ]}
                          >
                            {mode}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Message */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Message / Queries (Optional)</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter any questions or requirements here..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    multiline={true}
                    numberOfLines={4}
                    value={message}
                    onChangeText={setMessage}
                  />
                </View>

                {/* Submit button (ivory pill with arrow circle) */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitButton}
                  activeOpacity={0.9}
                >
                  <Text style={styles.submitButtonText}>Reserve My Seat</Text>
                  <View style={styles.arrowCircle}>
                    <ArrowRightIcon size={10} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Right: WhatsApp Info */}
          <View style={[styles.infoCol, isMobile && styles.infoColMobile]}>
            <View style={styles.infoBox}>
              <View style={styles.iconCircle}>
                <WhatsAppIcon size={32} color="#e85a2b" />
              </View>
              <Text style={styles.infoTitle}>Connect on WhatsApp</Text>
              <Text style={styles.infoDesc}>
                Prefer direct communication? Chat with our team or trainer now to resolve queries and book your class.
              </Text>
              <View style={styles.whatsappCard}>
                <Text style={styles.whatsappLabel}>WhatsApp / Call Details</Text>
                <Text style={styles.whatsappNumber}>{ACADEMY_CONFIG.WHATSAPP_NUMBER}</Text>
                <Text style={styles.whatsappText}>
                  DM us or WhatsApp now to reserve your seat.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

ContactForm.displayName = 'ContactForm';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F3E7',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  contentInner: {
    maxWidth: 1100,
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
    color: '#e85a2b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  title: {
    color: '#141416',
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
    color: '#8B847A',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 600,
  },
  layoutRow: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'space-between',
  },
  layoutRowMobile: {
    flexDirection: 'column',
    gap: 40,
  },
  formCard: {
    flex: 1.3,
    backgroundColor: '#141416',
    borderRadius: 30,
    padding: 36,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    position: 'relative',
    overflow: 'hidden',
  },
  glowTopRight: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(232, 90, 43, 0.15)',
    top: -150,
    right: -80,
    filter: 'blur(35px)' as any,
    pointerEvents: 'none',
  },
  form: {
    gap: 20,
    zIndex: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 16,
  },
  fieldRowMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#232326',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  inputError: {
    borderColor: '#EF4444',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 10,
  },
  selectorItem: {
    flex: 1,
    backgroundColor: '#232326',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  selectorItemActive: {
    borderColor: '#e85a2b',
    backgroundColor: 'rgba(232, 90, 43, 0.1)',
  },
  selectorText: {
    color: '#8B847A',
    fontSize: 14,
    fontWeight: '700',
  },
  selectorTextActive: {
    color: '#e85a2b',
  },
  submitButton: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 10,
    paddingLeft: 24,
    paddingRight: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  submitButtonText: {
    color: '#141416',
    fontSize: 15,
    fontWeight: '700',
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e85a2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    zIndex: 1,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e85a2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
  },
  successDesc: {
    color: '#8B847A',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 450,
    marginBottom: 32,
  },
  boldText: {
    color: '#e85a2b',
    fontWeight: '700',
  },
  resetButton: {
    borderWidth: 2,
    borderColor: '#e85a2b',
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  infoCol: {
    flex: 0.7,
  },
  infoColMobile: {
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#141416',
    borderRadius: 30,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(232, 90, 43, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  infoDesc: {
    color: '#8B847A',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  whatsappCard: {
    backgroundColor: '#232326',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  whatsappLabel: {
    color: '#e85a2b',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  whatsappNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  whatsappText: {
    color: '#8B847A',
    fontSize: 13,
    lineHeight: 18,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}

export default ContactForm;
