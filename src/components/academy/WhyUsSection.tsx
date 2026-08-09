import React, { useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform, Animated } from 'react-native';
import { MicrophoneIcon, BookIcon, VocabularyIcon, LevelIcon } from './icons';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bgStyle: any;
}

function WhyUsCard({ item }: { item: FeatureItem }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handleHoverIn = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.03,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -6,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHoverOut = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale }, { translateY }],
        },
        item.bgStyle,
      ]}
      {...(Platform.OS === 'web'
        ? {
            onMouseEnter: handleHoverIn,
            onMouseLeave: handleHoverOut,
          }
        : {})}
    >
      <View style={styles.iconCircle}>{item.icon}</View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </Animated.View>
  );
}

export default function WhyUsSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const features: FeatureItem[] = [
    {
      icon: <MicrophoneIcon size={22} color="#fde351" />,
      title: 'Practical Speaking Focus',
      desc: 'Instead of just memorizing grammar tenses, engage directly in interactive conversation drills from session one.',
      bgStyle: {
        backgroundColor: '#f6f3eb',
        borderWidth: 1,
        borderColor: '#e8e4d6',
        ...Platform.select({
          web: {
            backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
            boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04), 0 16px 28px -8px rgba(40, 40, 30, 0.06)',
          } as any,
        }),
      },
    },
    {
      icon: <BookIcon size={22} color="#fde351" />,
      title: 'Expert Personal Coaching',
      desc: 'Learn directly from Trainer Alisha Ahmed, receiving personal guidance and speaking corrections.',
      bgStyle: {
        backgroundColor: '#f6f3eb',
        borderWidth: 1,
        borderColor: '#e8e4d6',
        ...Platform.select({
          web: {
            backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
            boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04), 0 16px 28px -8px rgba(40, 40, 30, 0.06)',
          } as any,
        }),
      },
    },
    {
      icon: <VocabularyIcon size={22} color="#fde351" />,
      title: 'Daily Speaking Activities',
      desc: 'Participate in group discussions, roleplay dialogues, and vocabulary boost drills to eliminate hesitation.',
      bgStyle: {
        backgroundColor: '#f6f3eb',
        borderWidth: 1,
        borderColor: '#e8e4d6',
        ...Platform.select({
          web: {
            backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
            boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04), 0 16px 28px -8px rgba(40, 40, 30, 0.06)',
          } as any,
        }),
      },
    },
    {
      icon: <LevelIcon size={22} color="#fde351" />,
      title: 'Structured Syllabus',
      desc: 'A comprehensive study path designed specifically for school kids, college students, job seekers, and business owners.',
      bgStyle: {
        backgroundColor: '#f6f3eb',
        borderWidth: 1,
        borderColor: '#e8e4d6',
        ...Platform.select({
          web: {
            backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
            boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04), 0 16px 28px -8px rgba(40, 40, 30, 0.06)',
          } as any,
        }),
      },
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
        {/* Section Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Why choose us</Text>
          </View>
          <Text style={styles.title}>Speak English confidently</Text>
          <Text style={styles.subtitle}>
            We build a comfortable learning environment focused on speaking practice, grammar foundations, and career skills.
          </Text>
        </View>

        {/* Features Card Grid */}
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {features.map((feat, idx) => (
            <View key={idx} style={getCardStyle()}>
              <WhyUsCard item={feat} />
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
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    alignItems: 'flex-start',
    minHeight: 280,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
    ...Platform.select({
      ios: {
        shadowColor: '#0a0a0a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
      },
      android: {
        elevation: 1.5,
      },
      web: {
        transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.25s',
      } as any,
    }),
  },
  cardDesktop: {
    width: '23.5%',
    minWidth: 260,
  },
  cardTablet: {
    width: '47%',
    minWidth: 260,
  },
  cardMobile: {
    width: '100%',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0a0a0a',
  },
  cardTitle: {
    color: '#0a0a0a',
    fontSize: 18,
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
