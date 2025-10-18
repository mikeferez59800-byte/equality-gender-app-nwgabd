
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface GameScenario {
  id: number;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const scenarios: GameScenario[] = [
  {
    id: 1,
    situation: "Marie et Tom sont à une fête. Tom propose à Marie de danser. Marie hésite et ne répond pas. Que devrait faire Tom ?",
    options: [
      {
        text: "Insister gentiment",
        isCorrect: false,
        feedback: "Non. L'hésitation n'est pas un consentement. Tom devrait respecter le silence de Marie."
      },
      {
        text: "Prendre sa main et l'emmener danser",
        isCorrect: false,
        feedback: "Non. Cela ne respecte pas le consentement de Marie. Il ne faut jamais forcer quelqu'un."
      },
      {
        text: "Lui dire que ce n'est pas grave et respecter son choix",
        isCorrect: true,
        feedback: "Excellent ! Tom respecte le fait que Marie n'a pas donné de réponse claire. Le silence n'est pas un oui."
      }
    ]
  },
  {
    id: 2,
    situation: "Sophie et Alex sortent ensemble depuis 6 mois. Un soir, Sophie dit qu'elle est fatiguée et ne veut pas de câlins. Que devrait faire Alex ?",
    options: [
      {
        text: "Insister car ils sont en couple",
        isCorrect: false,
        feedback: "Non. Être en couple ne signifie pas un consentement automatique. Chaque interaction nécessite un accord."
      },
      {
        text: "Respecter son choix sans faire de commentaire négatif",
        isCorrect: true,
        feedback: "Parfait ! Alex respecte les limites de Sophie. Le consentement est nécessaire à chaque fois, même dans une relation."
      },
      {
        text: "Se vexer et bouder",
        isCorrect: false,
        feedback: "Non. Faire pression émotionnellement n'est pas respectueux. Chacun a le droit de dire non."
      }
    ]
  },
  {
    id: 3,
    situation: "Lors d'une soirée, Léa a bu plusieurs verres. Un ami lui propose de la raccompagner chez elle. Que devrait-il faire ?",
    options: [
      {
        text: "Profiter de la situation",
        isCorrect: false,
        feedback: "Non. Une personne intoxiquée ne peut pas donner un consentement éclairé. C'est inacceptable."
      },
      {
        text: "La raccompagner en sécurité sans rien attendre en retour",
        isCorrect: true,
        feedback: "Excellent ! L'ami agit de manière responsable et respectueuse. Aider quelqu'un ne donne aucun droit."
      },
      {
        text: "Lui demander un baiser en échange",
        isCorrect: false,
        feedback: "Non. Cela crée une pression et profite d'une situation de vulnérabilité. C'est inapproprié."
      }
    ]
  },
  {
    id: 4,
    situation: "Emma et Lucas s'embrassent. Emma dit soudainement 'Arrête'. Que devrait faire Lucas ?",
    options: [
      {
        text: "Continuer en pensant qu'elle plaisante",
        isCorrect: false,
        feedback: "Non. 'Arrête' signifie arrête. Il faut toujours respecter un refus, même si cela semble soudain."
      },
      {
        text: "S'arrêter immédiatement",
        isCorrect: true,
        feedback: "Parfait ! Lucas respecte le retrait de consentement d'Emma. Le consentement peut être retiré à tout moment."
      },
      {
        text: "Demander pourquoi avant d'arrêter",
        isCorrect: false,
        feedback: "Non. Il faut d'abord s'arrêter immédiatement. Les explications peuvent venir après si Emma le souhaite."
      }
    ]
  },
  {
    id: 5,
    situation: "Paul envoie une photo intime à Chloé sans lui demander. Quelle est la bonne réaction ?",
    options: [
      {
        text: "C'est normal entre personnes qui se plaisent",
        isCorrect: false,
        feedback: "Non. Envoyer du contenu intime sans consentement est une violation. Il faut toujours demander avant."
      },
      {
        text: "Chloé devrait être flattée",
        isCorrect: false,
        feedback: "Non. Personne ne devrait recevoir du contenu non sollicité. C'est irrespectueux et peut être illégal."
      },
      {
        text: "Paul aurait dû demander la permission avant",
        isCorrect: true,
        feedback: "Exact ! Le consentement s'applique aussi aux contenus numériques. Il faut toujours demander avant d'envoyer du contenu intime."
      }
    ]
  }
];

export default function ConsentGameScreen() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    if (scenarios[currentScenario].options[optionIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    const percentage = Math.round((score / scenarios.length) * 100);
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
            <View style={[styles.scoreCircle, { borderColor: colors.primary }]}>
              <Text style={styles.scoreText}>{score}/{scenarios.length}</Text>
            </View>
            <Text style={styles.resultsTitle}>Jeu Terminé !</Text>
            <Text style={styles.resultsSubtitle}>
              Vous avez identifié {score} situation{score > 1 ? 's' : ''} correctement.
            </Text>
            
            {percentage >= 80 && (
              <View style={[styles.messageCard, { backgroundColor: colors.accent }]}>
                <IconSymbol name="star.fill" color="#FFFFFF" size={40} />
                <Text style={styles.messageTitle}>Bravo !</Text>
                <Text style={styles.messageText}>
                  Vous avez une excellente compréhension du consentement.
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

            <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRestart}>
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

  const scenario = scenarios[currentScenario];

  return (
    <>
      <Stack.Screen
        options={{
          title: `Situation ${currentScenario + 1}/${scenarios.length}`,
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
                  width: `${((currentScenario + 1) / scenarios.length) * 100}%`,
                  backgroundColor: colors.primary 
                }
              ]} 
            />
          </View>

          <View style={styles.scenarioCard}>
            <IconSymbol name="person.2.fill" color={colors.primary} size={32} />
            <Text style={styles.scenarioText}>{scenario.situation}</Text>
          </View>

          <Text style={styles.instructionText}>Quelle est la meilleure réponse ?</Text>

          <View style={styles.optionsContainer}>
            {scenario.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const showResult = showFeedback && isSelected;

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.optionCard,
                    isSelected && !showFeedback && { backgroundColor: colors.highlight },
                    showResult && option.isCorrect && { backgroundColor: colors.accent },
                    showResult && !option.isCorrect && { backgroundColor: '#FFB6C1' },
                  ]}
                  onPress={() => handleOptionSelect(index)}
                  disabled={showFeedback}
                >
                  <Text style={[
                    styles.optionText,
                    showResult && { color: '#FFFFFF' }
                  ]}>
                    {option.text}
                  </Text>
                  {showResult && option.isCorrect && (
                    <IconSymbol name="checkmark.circle.fill" color="#FFFFFF" size={24} />
                  )}
                  {showResult && !option.isCorrect && (
                    <IconSymbol name="xmark.circle.fill" color="#FFFFFF" size={24} />
                  )}
                </Pressable>
              );
            })}
          </View>

          {showFeedback && selectedOption !== null && (
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackTitle}>
                {scenario.options[selectedOption].isCorrect ? "✅ Correct !" : "❌ Pas tout à fait"}
              </Text>
              <Text style={styles.feedbackText}>
                {scenario.options[selectedOption].feedback}
              </Text>
            </View>
          )}

          {showFeedback && (
            <Pressable 
              style={[styles.nextButton, { backgroundColor: colors.primary }]} 
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentScenario < scenarios.length - 1 ? "Situation Suivante" : "Voir les Résultats"}
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
  scenarioCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(123, 104, 238, 0.15)',
    elevation: 3,
    alignItems: 'center',
  },
  scenarioText: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    textAlign: 'center',
    marginTop: 12,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
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
  feedbackCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  feedbackText: {
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
