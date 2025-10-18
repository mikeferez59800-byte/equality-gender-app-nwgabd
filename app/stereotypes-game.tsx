
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Statement {
  id: number;
  text: string;
  isTrue: boolean;
  explanation: string;
}

const statements: Statement[] = [
  {
    id: 1,
    text: "Les stéréotypes de genre commencent dès la petite enfance",
    isTrue: true,
    explanation: "VRAI. Dès la naissance, les enfants sont exposés à des stéréotypes à travers les jouets, les vêtements, et les attentes sociales."
  },
  {
    id: 2,
    text: "Les garçons sont biologiquement programmés pour aimer le bleu",
    isTrue: false,
    explanation: "FAUX. Les préférences de couleur sont culturelles, pas biologiques. Au début du 20e siècle, le rose était considéré comme masculin !"
  },
  {
    id: 3,
    text: "Les stéréotypes n'affectent que les femmes",
    isTrue: false,
    explanation: "FAUX. Les stéréotypes affectent tout le monde. Les hommes subissent aussi des pressions pour correspondre à des rôles masculins rigides."
  },
  {
    id: 4,
    text: "Les médias jouent un rôle important dans la perpétuation des stéréotypes",
    isTrue: true,
    explanation: "VRAI. Les films, séries, publicités et jeux vidéo véhiculent souvent des représentations stéréotypées qui influencent nos perceptions."
  },
  {
    id: 5,
    text: "Il est impossible de changer les stéréotypes",
    isTrue: false,
    explanation: "FAUX. Les stéréotypes sont des constructions sociales qui peuvent évoluer. L'éducation et la sensibilisation sont des outils puissants."
  },
  {
    id: 6,
    text: "Les stéréotypes peuvent limiter les choix de carrière",
    isTrue: true,
    explanation: "VRAI. Les stéréotypes découragent certaines personnes de poursuivre des carrières 'non traditionnelles' pour leur genre."
  }
];

export default function StereotypesGameScreen() {
  const [currentStatement, setCurrentStatement] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleAnswerSelect = (answer: boolean) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === statements[currentStatement].isTrue) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentStatement < statements.length - 1) {
      setCurrentStatement(currentStatement + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStatement(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    const percentage = Math.round((score / statements.length) * 100);
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
              <Text style={styles.scoreText}>{score}/{statements.length}</Text>
            </View>
            <Text style={styles.resultsTitle}>Jeu Terminé !</Text>
            <Text style={styles.resultsSubtitle}>
              Vous avez trouvé {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}.
            </Text>
            
            {percentage >= 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="star.fill" color="#FFFFFF" size={40} />
                <Text style={styles.messageTitle}>Bravo !</Text>
                <Text style={styles.messageText}>
                  Vous avez une excellente compréhension des stéréotypes.
                </Text>
              </View>
            )}
            
            {percentage >= 50 && percentage < 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.secondary }]}>
                <IconSymbol name="hand.thumbsup.fill" color="#FFFFFF" size={40} />
                <Text style={styles.messageTitle}>Bien joué !</Text>
                <Text style={styles.messageText}>
                  Vous êtes sur la bonne voie. Continuez à apprendre !
                </Text>
              </View>
            )}
            
            {percentage < 50 && (
              <View style={[styles.messageCard, { backgroundColor: colors.primary }]}>
                <IconSymbol name="book.fill" color="#FFFFFF" size={40} />
                <Text style={styles.messageTitle}>Continuez !</Text>
                <Text style={styles.messageText}>
                  Prenez le temps de relire les explications pour mieux comprendre.
                </Text>
              </View>
            )}

            <Pressable style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleRestart}>
              <Text style={styles.buttonText}>Rejouer</Text>
            </Pressable>
            
            <Pressable style={[styles.button, { backgroundColor: colors.card }]} onPress={() => router.back()}>
              <Text style={[styles.buttonText, { color: colors.text }]}>Retour</Text>
            </Pressable>
          </ScrollView>
        </View>
      </>
    );
  }

  const statement = statements[currentStatement];

  return (
    <>
      <Stack.Screen
        options={{
          title: `Affirmation ${currentStatement + 1}/${statements.length}`,
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
                  width: `${((currentStatement + 1) / statements.length) * 100}%`,
                  backgroundColor: colors.accent 
                }
              ]} 
            />
          </View>

          <View style={styles.titleCard}>
            <Text style={styles.titleText}>Vrai ou Faux ?</Text>
          </View>

          <View style={styles.statementCard}>
            <IconSymbol name="questionmark.circle.fill" color={colors.accent} size={40} />
            <Text style={styles.statementText}>{statement.text}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <Pressable
              style={[
                styles.optionButton,
                { backgroundColor: colors.accent },
                selectedAnswer === true && !showExplanation && { opacity: 0.7 },
                showExplanation && selectedAnswer === true && statement.isTrue && { backgroundColor: '#4CAF50' },
                showExplanation && selectedAnswer === true && !statement.isTrue && { backgroundColor: '#FF6B6B' },
              ]}
              onPress={() => handleAnswerSelect(true)}
              disabled={showExplanation}
            >
              <IconSymbol 
                name={showExplanation && selectedAnswer === true ? 
                  (statement.isTrue ? "checkmark.circle.fill" : "xmark.circle.fill") : 
                  "checkmark.seal.fill"
                } 
                color="#FFFFFF" 
                size={32} 
              />
              <Text style={styles.optionText}>VRAI</Text>
            </Pressable>

            <Pressable
              style={[
                styles.optionButton,
                { backgroundColor: colors.primary },
                selectedAnswer === false && !showExplanation && { opacity: 0.7 },
                showExplanation && selectedAnswer === false && !statement.isTrue && { backgroundColor: '#4CAF50' },
                showExplanation && selectedAnswer === false && statement.isTrue && { backgroundColor: '#FF6B6B' },
              ]}
              onPress={() => handleAnswerSelect(false)}
              disabled={showExplanation}
            >
              <IconSymbol 
                name={showExplanation && selectedAnswer === false ? 
                  (!statement.isTrue ? "checkmark.circle.fill" : "xmark.circle.fill") : 
                  "xmark.circle.fill"
                } 
                color="#FFFFFF" 
                size={32} 
              />
              <Text style={styles.optionText}>FAUX</Text>
            </Pressable>
          </View>

          {showExplanation && (
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                {selectedAnswer === statement.isTrue ? "✅ Correct !" : "❌ Incorrect"}
              </Text>
              <Text style={styles.explanationText}>{statement.explanation}</Text>
            </View>
          )}

          {showExplanation && (
            <Pressable 
              style={[styles.nextButton, { backgroundColor: colors.accent }]} 
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentStatement < statements.length - 1 ? "Affirmation Suivante" : "Voir les Résultats"}
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
  titleCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 19,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginTop: 16,
    fontWeight: '500',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  resultsSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  messageCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
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
