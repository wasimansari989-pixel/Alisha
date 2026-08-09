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
      icon: <MicrophoneIcon size={26} color="#141416" />,
      title: 'Practical Speaking Focus',
      desc: 'Instead of just memorizing grammar tenses, engage directly in interactive conversation drills from session one.',
      bgStyle: {
        backgroundColor: '#C8ECC8',
        borderWidth: 1,
        borderColor: '#95C598',
        ...Platform.select({
          web: {
            background: 'linear-gradient(135deg, #DCF5DC, #C8ECC8, #95C598)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 30px -10px rgba(0, 0, 0, 0.05)',
          } as any,
        }),
      },
    },
    {
      icon: <BookIcon size={26} color="#141416" />,
      title: 'Expert Personal Coaching',
      desc: 'Learn directly from Trainer Alisha Ahmed, receiving personal guidance and speaking corrections.',
      bgStyle: {
        backgroundColor: '#FBC536',
        borderWidth: 1,
        borderColor: '#D99C10',
        ...Platform.select({
          web: {
            background: 'linear-gradient(135deg, #FFD96A, #FBC536, #D99C10)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 30px -10px rgba(0, 0, 0, 0.05)',
          } as any,
        }),
      },
    },
    {
      icon: <VocabularyIcon size={26} color="#141416" />,
      title: 'Daily Speaking Activities',
      desc: 'Participate in group discussions, roleplay dialogues, and vocabulary boost drills to eliminate hesitation.',
      bgStyle: {
        backgroundColor: '#DCD0EE',
        borderWidth: 1,
        borderColor: '#AB9BD0',
        ...Platform.select({
          web: {
            background: 'linear-gradient(135deg, #ECE2F8, #DCD0EE, #AB9BD0)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 30px -10px rgba(0, 0, 0, 0.05)',
          } as any,
        }),
      },
    },
    {
      icon: <LevelIcon size={26} color="#141416" />,
      title: 'Structured Syllabus',
      desc: 'A comprehensive study path designed specifically for school kids, college students, job seekers, and business owners.',
      bgStyle: {
        backgroundColor: '#C8ECC8',
        borderWidth: 1,
        borderColor: '#95C598',
        ...Platform.select({
          web: {
            background: 'linear-gradient(135deg, #DCF5DC, #C8ECC8, #95C598)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 30px -10px rgba(0, 0, 0, 0.05)',
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
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
    alignItems: 'flex-start',
    minHeight: 280,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
    ...Platform.select({
      ios: {
        shadowColor: '#141416',
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
  },
  cardTitle: {
    color: '#141416',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  cardDesc: {
    color: '#141416',
    opacity: 0.8,
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
