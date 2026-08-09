import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { GraduationIcon, ArrowRightIcon } from './icons';

interface CTASectionProps {
  onJoinPress: () => void;
}

export default function CTASection({ onJoinPress }: CTASectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      {/* Block 1: Success Story Placeholder */}
      <View style={styles.successPlaceholderCard}>
        <Text style={styles.successTitle}>Your Success Story Could Be Next</Text>
        <Text style={styles.successDesc}>
          Start your English learning journey today and build the confidence to communicate better in school, college, jobs, or business.
        </Text>
      </View>

      {/* Block 2: Final Action Banner */}
      <View style={styles.bannerContainer}>
        {/* Glow Backdrops - Novabrew-style */}
        <View style={styles.glowTopRight} />
        <View style={styles.glowBottomLeft} />

        <View style={styles.bannerInner}>
          <View style={styles.badge}>
            <GraduationIcon size={14} color="#141416" />
            <Text style={styles.badgeText}>Admissions Open Now!</Text>
          </View>

          <Text style={styles.bannerTitle}>
            Your Journey to Fluent English{'\n'}Starts Here.
          </Text>
          
          <Text style={styles.bannerSubtitle}>
            Learn today. Communicate confidently tomorrow.
          </Text>

          <View style={[styles.btnGroup, isMobile && styles.btnGroupMobile]}>
            {/* White/Ivory Pill button with sunset gradient arrow circle */}
            <TouchableOpacity
              onPress={onJoinPress}
              style={styles.primaryButton}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Join Now</Text>
              <View style={styles.arrowCircle}>
                <ArrowRightIcon size={10} color="#FFFFFF" />
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
    backgroundColor: '#F8F3E7',
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 56,
  },
  successPlaceholderCard: {
    maxWidth: 800,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#dad2bf',
    borderRadius: 22,
    padding: 40,
    alignItems: 'center',
    textAlign: 'center',
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
      },
    }),
  },
  successTitle: {
    color: '#141416',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  },
  successDesc: {
    color: '#8B847A',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 600,
  },
  bannerContainer: {
    maxWidth: 1080,
    width: '100%',
    backgroundColor: '#141416',
    borderRadius: 36,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  glowTopRight: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: 'rgba(232, 90, 43, 0.22)',
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
    backgroundColor: 'rgba(253, 198, 138, 0.1)',
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
    backgroundColor: '#e85a2b',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  badgeText: {
    color: '#FAF9F6',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
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
    color: '#8B847A',
    fontSize: 16,
    marginBottom: 36,
    textAlign: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  btnGroupMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 10,
    paddingLeft: 24,
    paddingRight: 10,
    borderRadius: 999,
    minWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  primaryButtonText: {
    color: '#141416',
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
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#e85a2b',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 999,
    minWidth: 200,
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
    fontSize: 14,
    fontWeight: '700',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
