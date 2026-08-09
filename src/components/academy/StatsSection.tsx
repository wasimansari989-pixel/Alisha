import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform, TouchableOpacity } from 'react-native';

export default function StatsSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <View style={[styles.statsRow, isMobile && styles.statsRowMobile]}>
        {/* Stat Dark Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.statHalf, styles.statDark]}
        >
          <View>
            <Text style={styles.statNumberDark}>100%</Text>
          </View>
          <Text style={styles.statDescDark}>
            Practical speaking drills and interactive conversations in every session.
          </Text>
          <View
            style={[
              styles.colorBar,
              Platform.OS === 'web'
                ? { backgroundImage: 'linear-gradient(90deg, #C02A2C, #EC782D)' } as any
                : { backgroundColor: '#C02A2C' },
            ]}
          />
        </TouchableOpacity>

        {/* Stat Light Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.statHalf, styles.statLight]}
        >
          <View>
            <Text style={styles.statNumberLight}>9.8 / 10</Text>
          </View>
          <Text style={styles.statDescLight}>
            Average ratings from 1,200+ students and professionals who achieved fluency.
          </Text>
          <View
            style={[
              styles.colorBar,
              Platform.OS === 'web'
                ? { backgroundImage: 'linear-gradient(90deg, #5B355A, #8D5288)' } as any
                : { backgroundColor: '#5B355A' },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebe9e1',
    paddingVertical: 32,
    paddingHorizontal: 24,
    zIndex: 5,
  },
  statsRow: {
    flexDirection: 'row',
    maxWidth: 1080,
    alignSelf: 'center',
    width: '100%',
    gap: 20,
  },
  statsRowMobile: {
    flexDirection: 'column',
  },
  statHalf: {
    flex: 1,
    borderRadius: 28,
    padding: 36,
    minHeight: 220,
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        transition: 'transform 0.2s ease',
        ':hover': {
          transform: 'translateY(-2px)',
        },
      } as any,
    }),
  },
  statDark: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#000000',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.3), inset -2px 2px 4px rgba(255, 255, 255, 0.06), inset 2px -2px 4px rgba(0, 0, 0, 0.4)',
      } as any,
    }),
  },
  statLight: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8e6dc',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafaf5 100%)',
        boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.18), inset -2px 2px 5px #ffffff, inset 2px -2px 5px rgba(0, 0, 0, 0.12)',
      } as any,
    }),
  },
  statNumberDark: {
    color: '#ffffff',
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2.5,
    lineHeight: 56,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  statNumberLight: {
    color: '#0a0a0a',
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2.5,
    lineHeight: 56,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  statDescDark: {
    color: '#8a8a84',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 16,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  statDescLight: {
    color: '#6a6a64',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 16,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  colorBar: {
    height: 6,
    borderRadius: 3,
    width: 90,
    marginTop: 18,
  },
});
