import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Animated } from 'react-native';
import {
  MicrophoneIcon,
  BookIcon,
  VocabularyIcon,
  PersonalityIcon,
  InterviewIcon,
  SpeakingIcon,
  LevelIcon,
  ArrowRightIcon,
} from './icons';

interface CoursesSectionProps {
  onEnrollPress: () => void;
}

interface CourseItem {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  desc: string;
  bgStyle: any;
}

function CourseCard({ item, onEnroll }: { item: CourseItem; onEnroll: () => void }) {
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
        styles.gridItem,
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
        <View style={styles.iconWrapper}>{item.icon}</View>
        <View style={styles.titleWrapper}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardTagline}>{item.tagline}</Text>
        </View>
      </View>
      <Text style={styles.cardDesc}>{item.desc}</Text>

      <TouchableOpacity
        onPress={onEnroll}
        style={styles.actionButton}
        activeOpacity={0.7}
      >
        <Text style={styles.actionText}>Enroll Interest</Text>
        <View style={styles.arrowCircle}>
          <ArrowRightIcon size={10} color="#141416" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function CoursesSection({ onEnrollPress }: CoursesSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const courses: CourseItem[] = [
    {
      icon: <MicrophoneIcon size={22} color="#141416" />,
      title: 'Spoken English',
      tagline: 'Fluency & confidence',
      desc: 'Master spoken communication, pronunciation, fluency, and express yourself with complete ease in public and social groups.',
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
      icon: <BookIcon size={22} color="#141416" />,
      title: 'Grammar',
      tagline: 'Basic to advanced structure',
      desc: 'Build strong structural foundations, sentence formations, correct usage of tenses, active/passive voice, and speech rules.',
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
      icon: <VocabularyIcon size={22} color="#141416" />,
      title: 'Vocabulary',
      tagline: 'Word power booster',
      desc: 'Expand your word bank, use modern idiomatic expressions, phrasal verbs, and professional terminology in conversations.',
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
      icon: <PersonalityIcon size={22} color="#141416" />,
      title: 'Personality Development',
      tagline: 'Communication & presence',
      desc: 'Improve body language, presentation posture, conversational skills, and social etiquette to build an impressive presence.',
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
      icon: <InterviewIcon size={22} color="#141416" />,
      title: 'Interview Preparation',
      tagline: 'Crack interviews with ease',
      desc: 'Learn resume building, practice mockup interviews, response framing, body language, and answer tough questions confidently.',
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
      icon: <SpeakingIcon size={22} color="#141416" />,
      title: 'Daily Speaking Practice',
      tagline: 'Everyday dialogue focus',
      desc: 'Engage in group discussions, extempore sessions, peer dialogue, and situational speaking drills to boost instant reaction.',
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
      icon: <LevelIcon size={22} color="#141416" />,
      title: 'Beginner to Advanced',
      tagline: 'Academic, jobs & business paths',
      desc: 'A comprehensive full-path curriculum designed explicitly for students, job seekers, working professionals, and business owners.',
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

  const getGridItemStyle = () => {
    if (isMobile) return styles.gridItemMobile;
    if (isTablet) return styles.gridItemTablet;
    return styles.gridItemDesktop;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        {/* Section Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Our course offerings</Text>
          </View>
          <Text style={styles.title}>Everything you need to master English</Text>
          <Text style={styles.subtitle}>
            Explore our curriculum structured to guide you step-by-step from fundamental grammar to executive communication.
          </Text>
        </View>

        {/* Courses Grid */}
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {courses.map((course, idx) => (
            <View key={idx} style={getGridItemStyle()}>
              <CourseCard item={course} onEnroll={onEnrollPress} />
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
    maxWidth: 640,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  gridItem: {
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
    justifyContent: 'space-between',
    minHeight: 260,
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
  gridItemDesktop: {
    width: '31.8%',
  },
  gridItemTablet: {
    width: '48%',
  },
  gridItemMobile: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
  },
  titleWrapper: {
    flex: 1,
  },
  cardTitle: {
    color: '#141416',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  cardTagline: {
    color: '#141416',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    opacity: 0.6,
  },
  cardDesc: {
    color: '#141416',
    opacity: 0.8,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#FAF9F6',
    paddingVertical: 8,
    paddingLeft: 18,
    paddingRight: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionText: {
    color: '#141416',
    fontSize: 13,
    fontWeight: '700',
  },
  arrowCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(20, 20, 22, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
