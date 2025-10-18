
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Question {
  id: number;
  statement: string;
  isStereotype: boolean;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    statement: "Les filles sont naturellement meilleures en français",
    isStereotype: true,
    explanation: "C'est un stéréotype. Les compétences linguistiques ne dépendent pas du genre mais de l'apprentissage et de la pratique."
  },
  {
    id: 2,
    statement: "Les garçons ne pleurent pas",
    isStereotype: true,
    explanation: "C'est un stéréotype toxique. Tout le monde a le droit d'exprimer ses émotions, quel que soit son genre."
  },
  {
    id: 3,
    statement: "Les femmes sont trop émotives pour diriger",
    isStereotype: true,
    explanation: "C'est un stéréotype sexiste. Les émotions sont humaines et n'empêchent pas de diriger efficacement."
  },
  {
    id: 4,
    statement: "Les hommes sont naturellement meilleurs en mathématiques",
    isStereotype: true,
    explanation: "C'est un stéréotype. Les études montrent que les différences de performance sont dues aux attentes sociales, pas au genre."
  },
  {
    id: 5,
    statement: "Le rose est une couleur de fille",
    isStereotype: true,
    explanation: "C'est un stéréotype culturel. Les couleurs n'ont pas de genre. Historiquement, le rose était même associé aux garçons !"
  },
  {
    id: 6,
    statement: "Chaque personne a des talents uniques indépendamment de son genre",
    isStereotype: false,
    explanation: "C'est une réalité ! Les capacités individuelles ne sont pas déterminées par le genre mais par la personne elle-même."
  },
  {
    id: 7,
    statement: "Les femmes doivent s'occuper des enfants",
    isStereotype: true,
    explanation: "C'est un stéréotype. Le soin des enfants est une responsabilité partagée entre les parents, quel que soit leur genre."
  },
  {
    id: 8,
    statement: "Les hommes ne peuvent pas faire plusieurs choses à la fois",
    isStereotype: true,
    explanation: "C'est un stéréotype. La capacité à gérer plusieurs tâches varie selon les individus, pas selon le genre."
  }
];

export default function StereotypesQuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answer: boolean) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === questions[currentQuestion].isStereotype) {
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
            <View style={[styles.scoreCircle, { borderColor: colors.accent }]}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
            </View>
            <Text style={styles.resultsTitle}>Quiz Terminé !</Text>
            <Text style={styles.resultsText}>
              Vous avez identifié {score} sur {questions.length} stéréotypes correctement.
            </Text>
            
            {percentage >= 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="star.fill" color="#FFFFFF" size={32} />
                <Text style={styles.messageText}>Excellent ! Vous savez bien identifier les stéréotypes.</Text>
              </View>
            )}
            
            {percentage >= 50 && percentage < 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="hand.thumbsup.fill" color="#FFFFFF" size={32} />
                <Text style={styles.messageText}>Bien joué ! Continuez à vous informer.</Text>
              </View>
            )}
            
            {percentage < 50 && (
              <View style={[styles.messageCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="book.fill" color="#FFFFFF" size={32} />
                <Text style={styles.messageText}>Continuez à apprendre à reconnaître les stéréotypes.</Text>
              </View>
            )}

            <Pressable style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleRestart}>
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
                  backgroundColor: colors.accent 
                }
              ]} 
            />
          </View>

          <View style={styles.instructionCard}>
            <Text style={styles.instructionText}>
              Cette affirmation est-elle un stéréotype ?
            </Text>
          </View>

          <View style={styles.statementCard}>
            <IconSymbol name="quote.bubble.fill" color={colors.accent} size={32} />
            <Text style={styles.statementText}>{question.statement}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <Pressable
              style={[
                styles.optionButton,
                { backgroundColor: colors.primary },
                selectedAnswer === true && !showExplanation && { opacity: 0.7 },
                showExplanation && selectedAnswer === true && question.isStereotype && { backgroundColor: colors.accent },
                showExplanation && selectedAnswer === true && !question.isStereotype && { backgroundColor: '#FFB6C1' },
              ]}
              onPress={() => handleAnswerSelect(true)}
              disabled={showExplanation}
            >
              <IconSymbol 
                name={showExplanation && selectedAnswer === true ? 
                  (question.isStereotype ? "checkmark.circle.fill" : "xmark.circle.fill") : 
                  "hand.raised.fill"
                } 
                color="#FFFFFF" 
                size={28} 
              />
              <Text style={styles.optionText}>Oui, c'est un stéréotype</Text>
            </Pressable>

            <Pressable
              style={[
                styles.optionButton,
                { backgroundColor: colors.secondary },
                selectedAnswer === false && !showExplanation && { opacity: 0.7 },
                showExplanation && selectedAnswer === false && !question.isStereotype && { backgroundColor: colors.accent },
                showExplanation && selectedAnswer === false && question.isStereotype && { backgroundColor: '#FFB6C1' },
              ]}
              onPress={() => handleAnswerSelect(false)}
              disabled={showExplanation}
            >
              <IconSymbol 
                name={showExplanation && selectedAnswer === false ? 
                  (!question.isStereotype ? "checkmark.circle.fill" : "xmark.circle.fill") : 
                  "checkmark.seal.fill"
                } 
                color="#FFFFFF" 
                size={28} 
              />
              <Text style={styles.optionText}>Non, c'est une réalité</Text>
            </Pressable>
          </View>

          {showExplanation && (
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                {selectedAnswer === question.isStereotype ? "✅ Correct !" : "❌ Pas tout à fait"}
              </Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}

          {showExplanation && (
            <Pressable 
              style={[styles.nextButton, { backgroundColor: colors.accent }]} 
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
  instructionCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  statementCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
  },
  statementText: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginTop: 16,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionButton: {
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  explanationCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  explanationTitle: {
    fontSize: 18,
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
