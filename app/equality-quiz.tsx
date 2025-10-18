
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qu'est-ce que l'égalité des genres ?",
    options: [
      "Les hommes et les femmes sont identiques",
      "Égalité des droits, responsabilités et opportunités",
      "Les femmes doivent avoir plus de droits",
      "Une mode passagère"
    ],
    correctAnswer: 1,
    explanation: "L'égalité des genres signifie que tous les êtres humains sont libres de développer leurs capacités personnelles et de faire des choix sans limitations imposées par des rôles de genre rigides."
  },
  {
    id: 2,
    question: "En France, depuis quelle année les femmes ont-elles le droit de vote ?",
    options: [
      "1789",
      "1920",
      "1944",
      "1968"
    ],
    correctAnswer: 2,
    explanation: "Les femmes françaises ont obtenu le droit de vote en 1944, grâce à l'ordonnance du 21 avril signée par le général de Gaulle. Elles ont voté pour la première fois en 1945."
  },
  {
    id: 3,
    question: "Qu'est-ce que l'écart salarial entre hommes et femmes ?",
    options: [
      "Un mythe sans fondement",
      "La différence de salaire pour un même travail",
      "Une différence qui n'existe plus",
      "Un problème uniquement dans les pays pauvres"
    ],
    correctAnswer: 1,
    explanation: "L'écart salarial désigne la différence de rémunération entre hommes et femmes. En France, les femmes gagnent en moyenne 15 à 25% de moins que les hommes, selon les secteurs."
  },
  {
    id: 4,
    question: "Qui devrait s'occuper des tâches ménagères dans un couple ?",
    options: [
      "Uniquement la femme",
      "Uniquement l'homme",
      "Les deux partenaires de manière équitable",
      "Celui qui gagne le moins"
    ],
    correctAnswer: 2,
    explanation: "Les tâches ménagères et familiales doivent être partagées équitablement entre les partenaires, indépendamment de leur genre. C'est une question de respect et d'égalité."
  },
  {
    id: 5,
    question: "Qu'est-ce que le 'plafond de verre' ?",
    options: [
      "Un type de construction",
      "Les obstacles invisibles à l'avancement professionnel des femmes",
      "Une loi protégeant les femmes",
      "Un problème résolu"
    ],
    correctAnswer: 1,
    explanation: "Le 'plafond de verre' désigne les barrières invisibles qui empêchent les femmes d'accéder aux postes de direction et de pouvoir, malgré leurs compétences."
  }
];

export default function EqualityQuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <>
        <Stack.Screen
          options={{
            title: "Résultats",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
          }}
        />
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ScrollView contentContainerStyle={styles.resultsContainer}>
            <View style={[styles.scoreCircle, { borderColor: colors.secondary }]}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
            </View>
            <Text style={styles.resultsTitle}>Quiz Terminé !</Text>
            <Text style={styles.resultsText}>
              Vous avez obtenu {score} sur {questions.length} bonnes réponses.
            </Text>
            
            {percentage >= 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="checkmark.circle.fill" color="#FFFFFF" size={32} />
                <Text style={styles.messageText}>Excellent ! Vous êtes bien informé(e) sur l'égalité des genres.</Text>
              </View>
            )}
            
            {percentage >= 50 && percentage < 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="star.fill" color="#FFFFFF" size={32} />
                <Text style={styles.messageText}>Bien joué ! Continuez à vous informer.</Text>
              </View>
            )}
            
            {percentage < 50 && (
              <View style={[styles.messageCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="book.fill" color="#FFFFFF" size={32} />
                <Text style={styles.messageText}>Continuez à apprendre sur ce sujet important.</Text>
              </View>
            )}

            <Pressable style={[styles.button, { backgroundColor: colors.secondary }]} onPress={handleRestart}>
              <Text style={styles.buttonText}>Recommencer</Text>
            </Pressable>
            
            <Pressable style={[styles.button, { backgroundColor: colors.card }]} onPress={() => router.back()}>
              <Text style={[styles.buttonText, { color: colors.text }]}>Retour</Text>
            </Pressable>
          </ScrollView>
        </View>
      </>
    );
  }

  const question = questions[currentQuestion];

  return (
    <>
      <Stack.Screen
        options={{
          title: `Question ${currentQuestion + 1}/${questions.length}`,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  backgroundColor: colors.secondary 
                }
              ]} 
            />
          </View>

          <Text style={styles.questionText}>{question.question}</Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showExplanation && isCorrect;
              const showIncorrect = showExplanation && isSelected && !isCorrect;

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.optionCard,
                    isSelected && !showExplanation && { backgroundColor: colors.highlight },
                    showCorrect && { backgroundColor: colors.accent },
                    showIncorrect && { backgroundColor: '#FFB6C1' },
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <Text style={[
                    styles.optionText,
                    (showCorrect || showIncorrect) && { color: '#FFFFFF' }
                  ]}>
                    {option}
                  </Text>
                  {showCorrect && (
                    <IconSymbol name="checkmark.circle.fill" color="#FFFFFF" size={24} />
                  )}
                  {showIncorrect && (
                    <IconSymbol name="xmark.circle.fill" color="#FFFFFF" size={24} />
                  )}
                </Pressable>
              );
            })}
          </View>

          {showExplanation && (
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>💡 Explication</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}

          {showExplanation && (
            <Pressable 
              style={[styles.nextButton, { backgroundColor: colors.secondary }]} 
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion < questions.length - 1 ? "Question Suivante" : "Voir les Résultats"}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.highlight,
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
    lineHeight: 30,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(123, 104, 238, 0.1)',
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  explanationCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  nextButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  messageCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
