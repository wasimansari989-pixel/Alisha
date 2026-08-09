import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Image } from 'react-native';
import { GraduationIcon, ArrowRightIcon } from './icons';
import Svg, { Path } from 'react-native-svg';

interface CTASectionProps {
  onJoinPress: () => void;
}

export default function CTASection({ onJoinPress }: CTASectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const testimonials = [
    {
      p1: "The final speaking results exceeded my expectations.",
      p2: "Alisha's direct feedback is incredibly effective!",
      initials: "AA.",
      avatars: ['https://i.pravatar.cc/80?img=12', 'https://i.pravatar.cc/80?img=47'],
    },
    {
      p1: "Best English course I've ever taken.",
      p2: "Cleared my job interview in just 6 weeks.",
      initials: "MK.",
      avatars: ['https://i.pravatar.cc/80?img=32', 'https://i.pravatar.cc/80?img=68'],
    },
    {
      p1: "Excellent structured tenses & vocabulary drills.",
      p2: "Boosted my confidence significantly.",
      initials: "JR.",
      avatars: ['https://i.pravatar.cc/80?img=52', 'https://i.pravatar.cc/80?img=60'],
    },
  ];

  const [tIndex, setTIndex] = useState(0);

  const cycleTestimonial = () => {
    setTIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentT = testimonials[tIndex];

  return (
    <View style={styles.container}>
      {/* Block 1: Success Story Testimonial (FirstPlace quote style) */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={cycleTestimonial}
        style={styles.testimonialCard}
      >
        <Text style={styles.quoteMark}>&ldquo;</Text>
        <View style={styles.testimonialTextContainer}>
          <Text style={styles.testimonialText}>{currentT.p1}</Text>
          <Text style={styles.testimonialText}>{currentT.p2}</Text>
        </View>

        <View style={styles.avatarsRow}>
          {currentT.avatars.map((url, idx) => (
            <View key={idx} style={[styles.avatarMini, idx > 0 && { marginLeft: -10 }]}>
              <Image source={{ uri: url }} style={styles.avatarImg} />
            </View>
          ))}
          <View style={styles.authorBadge}>
            <Text style={styles.authorInitials}>{currentT.initials}</Text>
          </View>
          <Text style={styles.clickHint}>— Click to swap success stories</Text>
        </View>
      </TouchableOpacity>

      {/* Block 2: Final Action Banner */}
      <View style={styles.bannerContainer}>
        {/* Glow Backdrops - FirstPlace gold */}
        <View style={styles.glowTopRight} />
        <View style={styles.glowBottomLeft} />

        <View style={styles.bannerInner}>
          <View style={styles.badge}>
            <GraduationIcon size={14} color="#0a0a0a" />
            <Text style={styles.badgeText}>Admissions Open Now!</Text>
          </View>

          <Text style={styles.bannerTitle}>
            Your Journey to Fluent English{'\n'}Starts Here.
          </Text>
          
          <Text style={styles.bannerSubtitle}>
            Learn today. Communicate confidently tomorrow.
          </Text>

          <View style={[styles.btnGroup, isMobile && styles.btnGroupMobile]}>
            {/* Yellow Big CTA */}
            <TouchableOpacity
              onPress={onJoinPress}
              style={styles.ctaYellow}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaText}>Book a call</Text>
              <View style={styles.ctaCircle}>
                <Svg viewBox="0 0 16 16" style={styles.ctaCircleSvg}>
                  <Path
                    d="M 5 11 L 11 5 M 7 5 L 11 5 L 11 9"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onJoinPress}
              style={styles.secondaryButton}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    gap: 56,
  },
  testimonialCard: {
    maxWidth: 1080,
    width: '100%',
    backgroundColor: '#f6f3eb',
    borderWidth: 1,
    borderColor: '#e8e4d6',
    borderRadius: 28,
    padding: 40,
    justifyContent: 'space-between',
    minHeight: 280,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
        boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04), 0 16px 28px -8px rgba(40, 40, 30, 0.06)',
        cursor: 'pointer',
      } as any,
    }),
  },
  quoteMark: {
    fontSize: 52,
    fontWeight: '700',
    lineHeight: 26,
    color: '#0a0a0a',
    marginBottom: 20,
    letterSpacing: -2,
  },
  testimonialTextContainer: {
    marginBottom: 22,
  },
  testimonialText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: -0.2,
    lineHeight: 28,
    marginBottom: 8,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f6f3eb',
    overflow: 'hidden',
    backgroundColor: '#6e2418',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  authorBadge: {
    marginLeft: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fde351',
    borderWidth: 2,
    borderColor: '#f6f3eb',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      },
    }),
  },
  authorInitials: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0a0a0a',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  clickHint: {
    marginLeft: 12,
    color: '#6a6a64',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  bannerContainer: {
    maxWidth: 1080,
    width: '100%',
    backgroundColor: '#0a0a0a',
    borderRadius: 36,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  glowTopRight: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: 'rgba(253, 227, 81, 0.15)',
    top: -225,
    right: -100,
    filter: 'blur(45px)' as any,
    pointerEvents: 'none',
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(253, 227, 81, 0.06)',
    bottom: -140,
    left: '10%',
    filter: 'blur(35px)' as any,
    pointerEvents: 'none',
  },
  bannerInner: {
    paddingVertical: 72,
    paddingHorizontal: 40,
    alignItems: 'center',
    zIndex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fde351',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  badgeText: {
    color: '#0a0a0a',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: clamp(28, 3.2, 42),
    fontWeight: '800',
    lineHeight: clamp(30, 3.4, 48),
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -1.5,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  },
  bannerSubtitle: {
    color: '#8a8a84',
    fontSize: 16,
    marginBottom: 36,
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroupMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ctaYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 28,
    paddingRight: 14,
    paddingVertical: 14,
    backgroundColor: '#fde351',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#d8b020',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #ffe760 0%, #fde351 55%, #f7d130 100%)',
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.7),
          inset 0 -2px 4px rgba(180, 140, 30, 0.3),
          0 2px 0 #d8a920,
          0 4px 0 #a87810
        `,
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(180, 140, 30, 0.3),
            0 3px 0 #d8a920,
            0 6px 0 #a87810
          `,
        },
      } as any,
    }),
  },
  ctaText: {
    color: '#0a0a0a',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  ctaCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaCircleSvg: {
    width: 14,
    height: 14,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
