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
  bgStyle: any;
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
        <Text style={styles.cardNum}>{item.num}</Text>
        <Text style={styles.cardEyebrow}>— {item.eyebrow}</Text>
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.iconCircle}>{item.icon}</View>
        <TouchableOpacity
          onPress={onSelect}
          style={styles.actionBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.actionBtnText}>{item.btnText}</Text>
          <View style={styles.arrowIconWrapper}>
            <ArrowRightIcon size={10} color="#141416" />
          </View>
        </TouchableOpacity>
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
      icon: <OnlineIcon size={22} color="#141416" />,
      btnText: 'Choose Online',
      mode: 'Online',
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
      num: '02',
      eyebrow: 'Interactive',
      title: 'Face-to-face drills. Direct feedback.',
      desc: 'Engage in physical classroom debates, team roleplays, networking sessions, and real-time posture corrections under Alisha\'s personal guidance.',
      icon: <OfflineIcon size={22} color="#141416" />,
      btnText: 'Choose Offline',
      mode: 'Offline',
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
      num: '03',
      eyebrow: 'Personalized',
      title: 'Tailored lessons. Custom timings.',
      desc: 'Receive 1-on-1 coaching customized for your specific career path, mock interview requirements, or IELTS speaking tests with flexible batch slots.',
      icon: <PersonalityIcon size={22} color="#141416" />,
      btnText: 'Choose 1-on-1',
      mode: 'Not Sure',
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
    backgroundColor: '#F8F3E7',
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#dad2bf',
  },
  contentInner: {
    maxWidth: 1200,
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
    maxWidth: 600,
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 20,
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
  card: {
    borderRadius: 36,
    padding: 36,
    minHeight: 420,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.06)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
    ...Platform.select({
      ios: {
        shadowColor: '#141416',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
      web: {
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
    color: '#141416',
    fontFamily: Platform.OS === 'web' ? 'var(--font-mono)' : 'monospace',
    opacity: 0.65,
  },
  cardEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#141416',
    fontFamily: Platform.OS === 'web' ? 'var(--font-mono)' : 'monospace',
    opacity: 0.65,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: clamp(24, 2.8, 30),
    lineHeight: clamp(28, 3.2, 36),
    fontWeight: '800',
    color: '#141416',
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
    color: '#141416',
    opacity: 0.8,
    marginBottom: 36,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
  },
  actionBtn: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 10,
    paddingLeft: 22,
    paddingRight: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(20, 20, 22, 0.05)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  actionBtnText: {
    color: '#141416',
    fontSize: 13,
    fontWeight: '700',
  },
  arrowIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
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
