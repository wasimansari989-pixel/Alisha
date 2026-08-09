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

        {/* Button Group (Single Unique Hero CTA) */}
        <View style={[styles.btnGroup, isMobile && styles.btnGroupMobile]}>
          {/* Unique Glowing "Meet Alisha" CTA */}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroupMobile: {
    width: '100%',
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
    backgroundColor: '#0a0a0a',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fde351',
    ...Platform.select({
      web: {
        boxShadow: `
          0 8px 24px rgba(253, 227, 81, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.4)
        `,
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: `
            0 12px 30px rgba(253, 227, 81, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -2px 4px rgba(0, 0, 0, 0.4)
          `,
        },
      } as any,
    }),
  },
  ctaSecondaryText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  ctaSecondaryArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fde351',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
