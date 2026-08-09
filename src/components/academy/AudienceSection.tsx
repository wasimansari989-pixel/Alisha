import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';

export default function AudienceSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const audiences = [
    {
      emoji: '🎓',
      title: 'Students',
      desc: 'Improve English fluency for school, college classes, writing essays, and academic success.',
    },
    {
      emoji: '💼',
      title: 'Job Seekers',
      desc: 'Build vocabulary, practice mocks, and prepare to crack job interviews with high confidence.',
    },
    {
      emoji: '👔',
      title: 'Professionals',
      desc: 'Communicate more confidently at office meetings, draft business emails, and boost presentations.',
    },
    {
      emoji: '🚀',
      title: 'Entrepreneurs',
      desc: 'Develop persuasive communication skills for client pitches, business negotiations, and networking.',
    },
    {
      emoji: '🗣️',
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
              <View style={styles.emojiCircle}>
                <Text style={styles.emojiText}>{aud.emoji}</Text>
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
    backgroundColor: '#F8F3E7',
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#dad2bf',
  },
  contentInner: {
    maxWidth: 1280,
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
    backgroundColor: '#F2EAD6', // Beige rounded cards
    borderRadius: 22,
    padding: 32,
    borderWidth: 1,
    borderColor: '#dad2bf',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#141416',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 8px 16px rgba(20, 20, 22, 0.01)',
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
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dad2bf',
  },
  emojiText: {
    fontSize: 20,
  },
  cardTitle: {
    color: '#141416',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  cardDesc: {
    color: '#8B847A',
    fontSize: 14,
    lineHeight: 22,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
