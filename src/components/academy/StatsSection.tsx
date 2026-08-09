import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';

export default function StatsSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const stats = [
    { val: '100%', label: 'Practical Speaking' },
    { val: '2', label: 'Class Modes' },
    { val: '9.8', label: 'Student Rating' },
    { val: 'Personal', label: 'Individual Focus' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.darkCard}>
        {/* Glow Backdrops - signature Novabrew look */}
        <View style={styles.glowTopRight} />
        <View style={styles.glowBottomLeft} />

        <View style={styles.grid}>
          {stats.map((stat, idx) => {
            const isLast = idx === stats.length - 1;
            return (
              <View
                key={idx}
                style={[
                  styles.gridCol,
                  isMobile && styles.gridColMobile,
                  !isMobile && !isLast && styles.borderRight,
                ]}
              >
                <Text style={styles.statVal}>{stat.val}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F3E7',
    paddingVertical: 40,
    paddingHorizontal: 24,
    zIndex: 5,
  },
  darkCard: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#141416',
    borderRadius: 36,
    paddingVertical: 56,
    paddingHorizontal: 36,
    position: 'relative',
    overflow: 'hidden',
  },
  glowTopRight: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(232, 90, 43, 0.25)', // Sunset Amber glow
    top: -160,
    right: -60,
    filter: 'blur(35px)' as any,
    pointerEvents: 'none',
  },
  glowBottomLeft: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(253, 198, 138, 0.1)',
    bottom: -125,
    left: '10%',
    filter: 'blur(30px)' as any,
    pointerEvents: 'none',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  gridCol: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  gridColMobile: {
    width: '100%',
    flex: 'none' as any,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.08)',
  },
  statVal: {
    color: '#FAF9F6',
    fontSize: clamp(34, 4.4, 60),
    fontWeight: '800',
    lineHeight: clamp(36, 4.6, 64),
    marginBottom: 6,
    letterSpacing: -1.5,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  } as any,
  statLabel: {
    color: '#8B847A',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
