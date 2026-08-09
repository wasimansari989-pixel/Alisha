import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface HeroSectionProps {
  onScrollTo: (section: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        {/* Headline */}
        <Text style={styles.title}>
          We drive{'\n'}growth to{'\n'}your English
          <View style={styles.arrowContainer}>
            <Svg viewBox="0 0 50 50" style={styles.arrowSvg}>
              <Path
                d="M 6 38 L 18 26 L 26 32 L 38 16"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <Path
                d="M 30 14 L 40 14 L 40 24"
                stroke="#0a0a0a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Unlock your potential with our proven English training expertise. From grammar foundations to spoken fluency and interview prep, we drive growth.
        </Text>

        {/* Button Group (FirstPlace side-by-side or stacked on mobile) */}
        <View style={[styles.btnGroup, isMobile && styles.btnGroupMobile]}>
          {/* Unique "Meet Alisha" CTA */}
          <TouchableOpacity
            onPress={() => onScrollTo('trainer')}
            style={styles.ctaSecondary}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaSecondaryText}>Meet Alisha</Text>
            <View style={styles.ctaSecondaryArrow}>
              <Svg viewBox="0 0 16 16" style={styles.ctaCircleSvg}>
                <Path
                  d="M 5 11 L 11 5 M 7 5 L 11 5 L 11 9"
                  stroke="#0a0a0a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
          </TouchableOpacity>

          {/* Yellow Big CTA */}
          <TouchableOpacity
            onPress={() => onScrollTo('contact')}
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebe9e1',
    paddingTop: 180,
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  contentInner: {
    maxWidth: 1080,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#0a0a0a',
    fontSize: Platform.OS === 'web' ? ('clamp(48px, 8.5vw, 92px)' as any) : 54,
    fontWeight: '800',
    lineHeight: Platform.OS === 'web' ? ('clamp(52px, 9vw, 94px)' as any) : 58,
    textAlign: 'center',
    marginBottom: 36,
    letterSpacing: -2.5,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  },
  arrowContainer: {
    width: Platform.OS === 'web' ? ('0.9em' as any) : 48,
    height: Platform.OS === 'web' ? ('0.9em' as any) : 48,
    marginLeft: 10,
    transform: [{ translateY: -2 }],
    justifyContent: 'center',
  },
  arrowSvg: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    color: '#6a6a64',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    maxWidth: 620,
    marginBottom: 44,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroupMobile: {
    flexDirection: 'column',
    width: '100%',
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
          0 4px 0 #a87810,
          0 8px 16px -2px rgba(200, 160, 30, 0.4),
          0 16px 28px -10px rgba(200, 160, 30, 0.3)
        `,
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(180, 140, 30, 0.3),
            0 3px 0 #d8a920,
            0 6px 0 #a87810,
            0 12px 22px -2px rgba(200, 160, 30, 0.45),
            0 22px 36px -10px rgba(200, 160, 30, 0.35)
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
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 28,
    paddingRight: 14,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        boxShadow: `
          inset 0 1px 0 #ffffff,
          0 2px 0 #e8e4d6,
          0 4px 12px rgba(40, 40, 30, 0.04)
        `,
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: `
            inset 0 1px 0 #ffffff,
            0 3px 0 #e8e4d6,
            0 6px 16px rgba(40, 40, 30, 0.06)
          `,
        },
      } as any,
    }),
  },
  ctaSecondaryText: {
    color: '#0a0a0a',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  ctaSecondaryArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f6f3eb',
    borderWidth: 1,
    borderColor: '#e8e4d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
