import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Animated, Pressable } from 'react-native';
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
import Svg, { Path } from 'react-native-svg';

interface CoursesSectionProps {
  onEnrollPress: () => void;
}

interface CourseItem {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  desc: string;
  colorBarGrad: string;
  colorBarFallback: string;
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
          <ArrowRightIcon size={10} color="#ffffff" />
        </View>
      </TouchableOpacity>

      <View
        style={[
          styles.colorBar,
          Platform.OS === 'web'
            ? { backgroundImage: item.colorBarGrad } as any
            : { backgroundColor: item.colorBarFallback },
        ]}
      />
    </Animated.View>
  );
}

export default function CoursesSection({ onEnrollPress }: CoursesSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Interactive tags state
  const tagsList = [
    { label: 'Spoken English', theme: 'black' },
    { label: 'Grammar tenses', theme: 'white' },
    { label: 'Vocabulary building', theme: 'black' },
    { label: 'Public speaking', theme: 'white' },
    { label: 'Interview preparation', theme: 'white' },
    { label: 'Personality growth', theme: 'black' },
  ];

  const slots = [
    { top: '15%', left: '10%', rot: '-4deg' },
    { top: '15%', left: '55%', rot: '3deg' },
    { top: '42%', left: '2%', rot: '-3deg' },
    { top: '42%', left: '50%', rot: '4deg' },
    { top: '70%', left: '12%', rot: '2deg' },
    { top: '70%', left: '55%', rot: '-2deg' },
  ];

  const [positions, setPositions] = useState(slots);

  const handleShuffle = () => {
    if (Platform.OS !== 'web') return;
    const shuffled = [...slots].sort(() => Math.random() - 0.5);
    setPositions(shuffled);
  };

  const courses: CourseItem[] = [
    {
      icon: <MicrophoneIcon size={22} color="#fde351" />,
      title: 'Spoken English',
      tagline: 'Fluency & confidence',
      desc: 'Master spoken communication, pronunciation, fluency, and express yourself with complete ease in public and social groups.',
      colorBarGrad: 'linear-gradient(90deg, #EFBA30, #F3E129)',
      colorBarFallback: '#EFBA30',
    },
    {
      icon: <BookIcon size={22} color="#fde351" />,
      title: 'Grammar',
      tagline: 'Basic to advanced structure',
      desc: 'Build strong structural foundations, sentence formations, correct usage of tenses, active/passive voice, and speech rules.',
      colorBarGrad: 'linear-gradient(90deg, #77889A, #96A3B4)',
      colorBarFallback: '#77889A',
    },
    {
      icon: <VocabularyIcon size={22} color="#fde351" />,
      title: 'Vocabulary',
      tagline: 'Word power booster',
      desc: 'Expand your word bank, use modern idiomatic expressions, phrasal verbs, and professional terminology in conversations.',
      colorBarGrad: 'linear-gradient(90deg, #5B965E, #91BD82)',
      colorBarFallback: '#5B965E',
    },
    {
      icon: <PersonalityIcon size={22} color="#fde351" />,
      title: 'Personality Development',
      tagline: 'Communication & presence',
      desc: 'Improve body language, presentation posture, conversational skills, and social etiquette to build an impressive presence.',
      colorBarGrad: 'linear-gradient(90deg, #3D838D, #8BC9D8)',
      colorBarFallback: '#3D838D',
    },
    {
      icon: <InterviewIcon size={22} color="#fde351" />,
      title: 'Interview Preparation',
      tagline: 'Crack interviews with ease',
      desc: 'Learn resume building, practice mockup interviews, response framing, body language, and answer tough questions confidently.',
      colorBarGrad: 'linear-gradient(90deg, #366184, #5A85A7)',
      colorBarFallback: '#366184',
    },
    {
      icon: <SpeakingIcon size={22} color="#fde351" />,
      title: 'Daily Speaking Practice',
      tagline: 'Everyday dialogue focus',
      desc: 'Engage in group discussions, extempore sessions, peer dialogue, and situational speaking drills to boost instant reaction.',
      colorBarGrad: 'linear-gradient(90deg, #625751, #A0938B)',
      colorBarFallback: '#625751',
    },
    {
      icon: <LevelIcon size={22} color="#fde351" />,
      title: 'Beginner to Advanced',
      tagline: 'Academic, jobs & business paths',
      desc: 'A comprehensive full-path curriculum designed explicitly for students, job seekers, working professionals, and business owners.',
      colorBarGrad: 'linear-gradient(90deg, #C02A2C, #EC782D)',
      colorBarFallback: '#C02A2C',
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Our program paths</Text>
          </View>
          <Text style={styles.title}>Explore our courses</Text>
          <Text style={styles.subtitle}>
            Explore our curriculum structured to guide you step-by-step from fundamental grammar to executive communication.
          </Text>
        </View>

        {/* FirstPlace Featured Services Shuffler Card */}
        <View style={styles.shufflerCard}>
          <Text style={styles.shufflerTitle}>Skills You Master</Text>
          <Text style={styles.shufflerDesc}>Click any tag below to shuffle the key skills you will build in our program.</Text>
          
          <Pressable onPress={handleShuffle} style={styles.tagsContainer}>
            {tagsList.map((tag, idx) => {
              const pos = positions[idx] || slots[0];
              const isBlack = tag.theme === 'black';
              
              return (
                <View
                  key={idx}
                  style={[
                    styles.tagBase,
                    isBlack ? styles.tagBlack : styles.tagWhite,
                    {
                      top: pos.top as any,
                      left: pos.left as any,
                      transform: [{ rotate: pos.rot }],
                    },
                  ]}
                >
                  {!isBlack && (
                    <View style={styles.tagIconWrapper}>
                      <Svg viewBox="0 0 12 12" style={styles.sparkleIcon}>
                        <Path d="M 6 1 L 7.2 4.8 L 11 6 L 7.2 7.2 L 6 11 L 4.8 7.2 L 1 6 L 4.8 4.8 Z" fill="#fde351" />
                      </Svg>
                    </View>
                  )}
                  <Text style={[styles.tagText, isBlack ? styles.tagTextBlack : styles.tagTextWhite]}>
                    {tag.label}
                  </Text>
                </View>
              );
            })}
          </Pressable>
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
    backgroundColor: '#ebe9e1',
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4d6',
  },
  contentInner: {
    maxWidth: 1080,
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
  shufflerCard: {
    backgroundColor: '#f6f3eb',
    borderRadius: 28,
    padding: 36,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    marginBottom: 56,
    ...Platform.select({
      ios: {
        shadowColor: '#0a0a0a',
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
        boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.18), inset -2px 2px 5px #ffffff, inset 2px -2px 5px rgba(0, 0, 0, 0.12)',
      } as any,
    }),
  },
  shufflerTitle: {
    color: '#0a0a0a',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  shufflerDesc: {
    color: '#6a6a64',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  tagsContainer: {
    position: 'relative',
    flex: 1,
    minHeight: 250,
  },
  tagBase: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    ...Platform.select({
      web: {
        transition: 'top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s',
        cursor: 'pointer',
      } as any,
    }),
  },
  tagBlack: {
    backgroundColor: '#0a0a0a',
    borderColor: '#000000',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 -1px 2px rgba(0, 0, 0, 0.5) inset, 0 2px 6px rgba(0, 0, 0, 0.18)',
      } as any,
    }),
  },
  tagWhite: {
    backgroundColor: '#ffffff',
    borderColor: '#e2dec8',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f4f1e8 100%)',
        boxShadow: 'inset 0 1px 0 #ffffff, 0 -1px 2px rgba(0, 0, 0, 0.03) inset, 0 2px 4px rgba(40, 40, 30, 0.06)',
      } as any,
    }),
  },
  tagIconWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIcon: {
    width: 9,
    height: 9,
  },
  tagText: {
    fontSize: 14.5,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  tagTextBlack: {
    color: '#ffffff',
  },
  tagTextWhite: {
    color: '#0a0a0a',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'flex-start',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  gridItem: {
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    backgroundColor: '#f6f3eb',
    justifyContent: 'space-between',
    minHeight: 290,
    ...Platform.select({
      ios: {
        shadowColor: '#0a0a0a',
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
        boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.18), inset -2px 2px 5px #ffffff, inset 2px -2px 5px rgba(0, 0, 0, 0.12)',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    flex: 1,
  },
  cardTitle: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  cardTagline: {
    color: '#6a6a64',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  cardDesc: {
    color: '#6a6a64',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  arrowCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBar: {
    height: 6,
    borderRadius: 3,
    width: 90,
    marginTop: 18,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
