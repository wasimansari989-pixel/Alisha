import React, { useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Platform, Animated } from 'react-native';

interface StepItem {
  step: string;
  title: string;
  desc: string;
  bgStyle: any;
}

function LearningJourneyCard({ item }: { item: StepItem }) {
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
        styles.contentCard,
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
      <View style={styles.cardHeader}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{item.step}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </Animated.View>
  );
}

export default function LearningJourney() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const steps: StepItem[] = [
    {
      step: '01',
      title: 'Grammar & Foundations',
      desc: 'Master the core rules, tenses, sentence structures, and build immediate grammatical confidence.',
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
      step: '02',
      title: 'Vocabulary & Word Power',
      desc: 'Boost your expressive capacity using modern verbs, idioms, phrases, and workplace terminology.',
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
      step: '03',
      title: 'Spoken Fluency Drills',
      desc: 'Engage in daily discussions, dialogs, situational speech drills, and eliminate hesitate blocks.',
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
      step: '04',
      title: 'Professional Presentation',
      desc: 'Perfect your interview frameworks, public speaking, body language, and career communication.',
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

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Learning Pathway</Text>
          </View>
          <Text style={styles.title}>Your journey to fluency</Text>
          <Text style={styles.subtitle}>
            A structured step-by-step pathway designed to take you from a basic learner to a highly confident speaker.
          </Text>
        </View>

        {/* Timeline Path */}
        <View style={[styles.timeline, isMobile && styles.timelineMobile]}>
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <View
                key={idx}
                style={[
                  styles.stepRow,
                  isMobile && styles.stepRowMobile,
                  !isMobile && (isEven ? styles.rowNormal : styles.rowReverse),
                ]}
              >
                {/* Content Box */}
                <View style={[styles.cardWrapper, isMobile && styles.cardWrapperMobile]}>
                  <LearningJourneyCard item={step} />
                </View>

                {/* Center Node Spacing */}
                {!isMobile && <View style={styles.centerSpacing} />}

                {/* Placeholder/Empty Column for Alignment */}
                {!isMobile && <View style={styles.emptyCol} />}
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
    backgroundColor: '#ebe9e1',
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4d6',
  },
  contentInner: {
    maxWidth: 1000,
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
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  timeline: {
    position: 'relative',
    gap: 32,
  },
  timelineMobile: {
    gap: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepRowMobile: {
    flexDirection: 'column',
    width: '100%',
  },
  rowNormal: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  cardWrapper: {
    flex: 1,
  },
  cardWrapperMobile: {
    width: '100%',
  },
  contentCard: {
    backgroundColor: '#f6f3eb',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#e8e4d6',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fde351',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d8b020',
    ...Platform.select({
      web: {
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      },
    }),
  },
  numberText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  cardTitle: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  cardDesc: {
    color: '#6a6a64',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  centerSpacing: {
    width: 80,
  },
  emptyCol: {
    flex: 1,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
