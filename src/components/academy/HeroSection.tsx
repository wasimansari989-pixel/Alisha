import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { ArrowRightIcon } from './icons';

interface HeroSectionProps {
  onScrollTo: (section: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Floating animation ref for the card stack
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth hover-float loop for the student portrait stack
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const floatTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  // Rotated cards stack portraits from unsplash (free educational assets)
  const portraitCards = [
    { uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', rot: '-9deg', top: 12 },
    { uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', rot: '-5deg', top: -8 },
    { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', rot: '3deg', top: 18 },
    { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', rot: '-2deg', top: 5 },
    { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', rot: '6deg', top: -14 },
    { uri: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80', rot: '-4deg', top: 10 },
    { uri: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&auto=format&fit=crop&q=80', rot: '4deg', top: -4 },
    { uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', rot: '-6deg', top: 16 },
  ];

  return (
    <View style={styles.container}>
      {/* Background Watermark Text - signature Novabrew look */}
      <Text style={styles.watermarkText}>fluency</Text>

      <View style={styles.contentInner}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Admissions Open Now!</Text>
        </View>

        {/* Hero Title */}
        <Text style={styles.title}>
          Speak English{'\n'}with{' '}
          <Text style={styles.italicAccent}>confidence.</Text>
        </Text>

        <Text style={styles.subtitle}>
          Learn English with practical speaking, tenses, vocabulary, and interview prep sessions designed for students and professionals.
        </Text>

        {/* CTA Banner Pill */}
        <TouchableOpacity
          onPress={() => onScrollTo('trainer')}
          style={styles.meetPill}
          activeOpacity={0.9}
        >
          <Text style={styles.meetPillText}>Meet Alisha</Text>
          <View style={styles.arrowCircle}>
            <ArrowRightIcon size={10} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Stack of overlapping rotated portrait cards */}
        <Animated.View style={[styles.cardStackRow, { transform: [{ translateY: floatTranslateY }] }]}>
          {portraitCards.map((card, idx) => (
            <View
              key={idx}
              style={[
                styles.cardFrame,
                {
                  transform: [{ rotate: card.rot }],
                  marginTop: card.top,
                  zIndex: idx,
                },
              ]}
            >
              <Image source={{ uri: card.uri }} style={styles.portraitImg} />
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F3E7',
    paddingTop: 160,
    paddingBottom: 96,
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  },
  watermarkText: {
    position: 'absolute',
    color: '#F2EAD6',
    fontSize: 220,
    fontWeight: '900',
    fontStyle: 'italic',
    bottom: -60,
    left: '5%',
    opacity: 0.8,
    letterSpacing: -10,
    zIndex: 0,
    ...Platform.select({
      web: {
        userSelect: 'none' as any,
      },
    }),
  },
  contentInner: {
    maxWidth: 1080,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  badge: {
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#dad2bf',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  badgeText: {
    color: '#8B847A',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    color: '#141416',
    fontSize: clamp(44, 7, 88),
    fontWeight: '800',
    lineHeight: clamp(48, 7.4, 94),
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -3,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  } as any,
  italicAccent: {
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#e85a2b',
  },
  subtitle: {
    color: '#8B847A',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    maxWidth: 580,
    marginBottom: 44,
  },
  meetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#141416',
    paddingVertical: 10,
    paddingLeft: 22,
    paddingRight: 10,
    borderRadius: 999,
    marginBottom: 64,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  meetPillText: {
    color: '#FAF9F6',
    fontSize: 14,
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
  cardStackRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: -24, // Overlap cards
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cardFrame: {
    width: 100,
    height: 125,
    borderRadius: 14,
    backgroundColor: '#FAF9F6',
    padding: 6,
    borderWidth: 1,
    borderColor: '#dad2bf',
    boxShadow: '0 8px 24px rgba(20, 20, 22, 0.08)',
    ...Platform.select({
      web: {
        transition: 'transform 0.3s ease, z-index 0.3s',
        ':hover': {
          transform: 'translateY(-10px) scale(1.15) rotate(0deg)',
          zIndex: 100,
        },
      } as any,
    }),
  },
  portraitImg: {
    flex: 1,
    borderRadius: 10,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
