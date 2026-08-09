import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import {
  GraduationIcon,
  InterviewIcon,
  ProfessionalIcon,
  RocketIcon,
  SpeakingHeadIcon,
} from './icons';

export default function AudienceSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const audiences = [
    {
      icon: <GraduationIcon size={22} color="#fde351" />,
      title: 'Students',
      desc: 'Improve English fluency for school, college classes, writing essays, and academic success.',
    },
    {
      icon: <InterviewIcon size={22} color="#fde351" />,
      title: 'Job Seekers',
      desc: 'Build vocabulary, practice mocks, and prepare to crack job interviews with high confidence.',
    },
    {
      icon: <ProfessionalIcon size={22} color="#fde351" />,
      title: 'Professionals',
      desc: 'Communicate more confidently at office meetings, draft business emails, and boost presentations.',
    },
    {
      icon: <RocketIcon size={22} color="#fde351" />,
      title: 'Entrepreneurs',
      desc: 'Develop persuasive communication skills for client pitches, business negotiations, and networking.',
    },
    {
      icon: <SpeakingHeadIcon size={22} color="#fde351" />,
      title: 'Everyday Learners',
      desc: 'Become highly comfortable and natural while speaking English in daily social interactions.',
    },
  ];

  const getCardStyle = () => {
    if (isMobile) return styles.cardMobile;
    if (isTablet) return styles.cardTablet;
    return styles.cardDesktop;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Target Audience</Text>
          </View>
          <Text style={styles.title}>Who is this program for?</Text>
          <Text style={styles.subtitle}>
            Designed for learners from all walks of life looking to build strong communication skills.
          </Text>
        </View>

        {/* Grid Container */}
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {audiences.map((aud, idx) => (
            <View key={idx} style={[styles.card, getCardStyle()]}>
              <View style={styles.iconCircle}>
                {aud.icon}
              </View>
              <Text style={styles.cardTitle}>{aud.title}</Text>
              <Text style={styles.cardDesc}>{aud.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#f6f3eb',
    borderRadius: 28,
    padding: 36,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#0a0a0a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
      web: {
        background: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
        boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04)',
        transition: 'transform 0.3s ease',
        cursor: 'default',
        ':hover': {
          transform: 'translateY(-4px)',
        },
      } as any,
    }),
  },
  cardDesktop: {
    width: '31.3%',
    minWidth: 280,
  },
  cardTablet: {
    width: '47%',
    minWidth: 280,
  },
  cardMobile: {
    width: '100%',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#0a0a0a',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  cardDesc: {
    color: '#6a6a64',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
