import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { OnlineIcon, OfflineIcon, PersonalityIcon, ArrowRightIcon } from './icons';

interface ClassModeSectionProps {
  onSelectMode: (mode: 'Online' | 'Offline' | 'Not Sure') => void;
}

interface CardItem {
  num: string;
  eyebrow: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  btnText: string;
  mode: 'Online' | 'Offline' | 'Not Sure';
  colorBarGrad: string;
  colorBarFallback: string;
}

function ClassModeCard({ item, onSelect }: { item: CardItem; onSelect: () => void }) {
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
        toValue: -8,
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
        styles.card,
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
      <View>
        <View style={styles.cardHeader}>
          <Text style={styles.cardNum}>{item.num}</Text>
          <Text style={styles.cardEyebrow}>— {item.eyebrow}</Text>
        </View>

        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
      </View>

      <View style={styles.cardFooterContainer}>
        <View style={styles.cardFooter}>
          <View style={styles.iconCircle}>{item.icon}</View>
          <TouchableOpacity
            onPress={onSelect}
            style={styles.actionBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>{item.btnText}</Text>
            <View style={styles.arrowIconWrapper}>
              <ArrowRightIcon size={10} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.colorBar,
            Platform.OS === 'web'
              ? { backgroundImage: item.colorBarGrad } as any
              : { backgroundColor: item.colorBarFallback },
          ]}
        />
      </View>
    </Animated.View>
  );
}

export default function ClassModeSection({ onSelectMode }: ClassModeSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const cards: CardItem[] = [
    {
      num: '01',
      eyebrow: 'Flexible',
      title: 'Every screen. Every session. Anywhere.',
      desc: 'Attend daily live video workshops, get instant pronunciation corrections, and practice conversational dialogue from the comfort of your home.',
      icon: <OnlineIcon size={22} color="#fde351" />,
      btnText: 'Choose Online',
      mode: 'Online',
      colorBarGrad: 'linear-gradient(90deg, #EFBA30, #F3E129)',
      colorBarFallback: '#EFBA30',
    },
    {
      num: '02',
      eyebrow: 'Interactive',
      title: 'Face-to-face drills. Direct feedback.',
      desc: 'Engage in physical classroom debates, team roleplays, networking sessions, and real-time posture corrections under Alisha\'s personal guidance.',
      icon: <OfflineIcon size={22} color="#fde351" />,
      btnText: 'Choose Offline',
      mode: 'Offline',
      colorBarGrad: 'linear-gradient(90deg, #5B965E, #91BD82)',
      colorBarFallback: '#5B965E',
    },
    {
      num: '03',
      eyebrow: 'Personalized',
      title: 'Tailored lessons. Custom timings.',
      desc: 'Receive 1-on-1 coaching customized for your specific career path, mock interview requirements, or IELTS speaking tests with flexible batch slots.',
      icon: <PersonalityIcon size={22} color="#fde351" />,
      btnText: 'Choose 1-on-1',
      mode: 'Not Sure',
      colorBarGrad: 'linear-gradient(90deg, #A73887, #EF5DA4)',
      colorBarFallback: '#A73887',
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
            <Text style={styles.eyebrowText}>Flexibility & Choice</Text>
          </View>
          <Text style={styles.title}>Flexible learning options</Text>
          <Text style={styles.subtitle}>
            Choose the learning mode that fits your lifestyle. Get the same premium curriculum and personal coaching in all modes.
          </Text>
        </View>

        {/* 3 Grid Cards */}
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {cards.map((card, idx) => (
            <View key={idx} style={getGridItemStyle()}>
              <ClassModeCard item={card} onSelect={() => onSelectMode(card.mode)} />
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
  grid: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 20,
  },
  gridItemDesktop: {
    width: '32%',
  },
  gridItemTablet: {
    width: '48%',
  },
  gridItemMobile: {
    width: '100%',
  },
  card: {
    borderRadius: 28,
    padding: 36,
    minHeight: 440,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e8e4d6',
    backgroundColor: '#f6f3eb',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  cardNum: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6a6a64',
    fontFamily: Platform.OS === 'web' ? 'var(--font-mono)' : 'monospace',
    opacity: 0.8,
  },
  cardEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6a6a64',
    fontFamily: Platform.OS === 'web' ? 'var(--font-mono)' : 'monospace',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: clamp(24, 2.8, 30),
    lineHeight: clamp(28, 3.2, 36),
    fontWeight: '800',
    color: '#0a0a0a',
    marginBottom: 16,
    letterSpacing: -1,
    ...Platform.select({
      web: {
        fontFamily: 'var(--font-display)',
      },
    }),
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6a6a64',
    marginBottom: 36,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  cardFooterContainer: {
    marginTop: 'auto',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingLeft: 22,
    paddingRight: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionBtnText: {
    color: '#0a0a0a',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  arrowIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBar: {
    height: 6,
    borderRadius: 3,
    width: 90,
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
