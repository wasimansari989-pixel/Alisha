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
                <TouchableOpacity
                  onPress={() => toggleExpand(idx)}
                  style={styles.faqHeader}
                  activeOpacity={0.8}
                >
                  <Text style={styles.questionText}>{faq.q}</Text>
                  <View style={[styles.arrowCircle, isExpanded && styles.arrowCircleActive]}>
                    {isExpanded ? (
                      <ChevronUpIcon size={16} color="#ffffff" />
                    ) : (
                      <ChevronDownIcon size={16} color="#6a6a64" />
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
    backgroundColor: '#ebe9e1',
    paddingVertical: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4d6',
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
  faqList: {
    gap: 16,
  },
  faqCard: {
    backgroundColor: '#f6f3eb',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e8e4d6',
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #f6f3eb 0%, #f1ede2 100%)',
        boxShadow: 'inset 0 1px 0 #ffffff, 0 4px 12px rgba(40, 40, 30, 0.04)',
      } as any,
    }),
  },
  faqCardExpanded: {
    borderColor: '#e8e4d6',
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
    color: '#0a0a0a',
    fontSize: 17,
    fontWeight: '800',
    flex: 1,
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e8e4d6',
  },
  arrowCircleActive: {
    backgroundColor: '#0a0a0a',
    borderColor: '#0a0a0a',
  },
  answerContainer: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    zIndex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e4d6',
    marginBottom: 16,
  },
  answerText: {
    color: '#6a6a64',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'var(--font-display)' : 'normal',
  },
});

function clamp(min: number, val: number, max: number) {
  const parsed = val * 10;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}
