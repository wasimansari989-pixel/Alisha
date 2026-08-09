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
    borderRadius: 24,
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
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          inset 0 -2px 4px rgba(0, 0, 0, 0.4),
          0 3px 0 rgba(0, 0, 0, 0.4),
          0 12px 24px -4px rgba(0, 0, 0, 0.18)
        `,
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
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 1),
          inset 0 -1px 2px rgba(0, 0, 0, 0.02),
          0 4px 12px rgba(40, 40, 30, 0.05),
          0 12px 24px -8px rgba(40, 40, 30, 0.07)
        `,
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
});
