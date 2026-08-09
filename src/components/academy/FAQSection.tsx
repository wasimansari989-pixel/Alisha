import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const faqs: FAQItem[] = [
    {
      q: 'Are classes available for complete beginners?',
      a: 'Yes, absolutely! Our syllabus starts from fundamental sentence structures and grammar basics, guiding you step-by-step to advanced spoken fluency.',
    },
    {
      q: 'What is the schedule/timing for Online & Offline batches?',
      a: 'We offer flexible timing options. Batch schedules are allocated based on student preference (morning, afternoon, and evening slots available). Online sessions are conducted via standard video apps, and offline sessions at our target campus.',
    },
    {
      q: 'Do you offer individual attention or personal feedback?',
      a: 'Yes. Each student receives direct feedback from Alisha Ahmed during daily speaking workshops, ensuring personal hurdles are addressed immediately.',
    },
    {
      q: 'Will I get study materials or speaking exercises?',
      a: 'Yes, we provide structured worksheets, practice vocabulary logs, conversational topic lists, and recorded materials depending on your course path.',
    },
    {
      q: 'Can I register/try a demo session before final enrollment?',
      a: 'Yes. Submit your details through our seat reservation form, and our learning consultant will arrange a session for you.',
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentInner}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.eyebrowContainer}>
            <Text style={styles.eyebrowText}>Frequently Asked Questions</Text>
          </View>
          <Text style={styles.title}>Have any questions?</Text>
          <Text style={styles.subtitle}>
            Find immediate answers about batch timings, learning paths, materials, and admissions.
          </Text>
        </View>

        {/* Accordions List */}
        <View style={styles.faqList}>
          {faqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <View key={idx} style={[styles.faqCard, isExpanded && styles.faqCardExpanded]}>
                {/* Glow Backdrop */}
                {isExpanded && <View style={styles.glowCorner} />}

                <TouchableOpacity
                  onPress={() => toggleExpand(idx)}
                  style={styles.faqHeader}
                  activeOpacity={0.8}
                >
                  <Text style={styles.questionText}>{faq.q}</Text>
                  <View style={[styles.arrowCircle, isExpanded && styles.arrowCircleActive]}>
                    {isExpanded ? (
                      <ChevronUpIcon size={16} color="#FAF9F6" />
                    ) : (
                      <ChevronDownIcon size={16} color="#8B847A" />
                    )}
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.answerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.answerText}>{faq.a}</Text>
                  </View>
                )}
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
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#dad2bf',
  },
  contentInner: {
    maxWidth: 800,
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
  faqList: {
    gap: 16,
  },
  faqCard: {
    backgroundColor: '#141416',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    position: 'relative',
  },
  faqCardExpanded: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  glowCorner: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(232, 90, 43, 0.08)',
    top: -100,
    right: -50,
    filter: 'blur(25px)' as any,
    pointerEvents: 'none',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 28,
    gap: 16,
    zIndex: 1,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  questionText: {
    color: '#FAF9F6',
    fontSize: 17,
    fontWeight: '800',
    flex: 1,
    letterSpacing: -0.2,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#232326',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  arrowCircleActive: {
    backgroundColor: '#e85a2b',
    borderColor: '#e85a2b',
  },
  answerContainer: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    zIndex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 16,
  },
  answerText: {
    color: '#8B847A',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
