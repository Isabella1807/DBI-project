# Clean Code

## Clean code og Statisk kodeanalyse
Bag Clean Code har vi sikre os at kode er læsbar og struktureret. For at opnå dette har vi valgt at følge camelCase-navngivningskonventioner for vores variabler. Dette gør det lettere at forstå og navigere i koden, da alle navne følger en ensartet struktur og giver en naturlig læseflow.

For at kunne anvende Statisk kodeanalyse har vi gjort brug af ESLint, som har hjulpet med at sikre, at koden følger de nødvendige strukturelle retningslinjer. ESLint har været med til at rense koden og give dem den nødvendige struktur. 

**Et eksempel på, hvordan vi anvender dette, kan ses i følgende kode:**

```
onMounted(() => {
  if (!['list', 'detailed'].includes(currentView.value)) {
    currentView.value = 'detailed';
    localStorage.setItem('currentView', 'detailed');
  }
});
```

Vi har brugt en række ESLint-regler for at opretholde en ensartet stil og forbedre kvaliteten af koden. **Her er et udpluk af de vigtigste regler:**

```
rules: {
        //'vue/component-tags-order': ['error', {
           // order: ['script', 'template', 'style']
       // }],
        'arrow-spacing': ['error', { 'before': true, 'after': true }],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': ['error', 'always-multiline'],
        //'line-comment-position': ['error', 'always'],
        //'array-bracket-newline': ['error', 'consistent'],
        'eqeqeq': ['error', 'always'],
        'indent': ['error', 2],
        'no-eval': ['error'],
        //'no-trailing-spaces': ['error'],
        'no-unused-vars': ['error'],
        'no-var': ['error'],
        'prefer-const': ['error'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'keyword-spacing': ["error", { "before": true }],
    }
```

## Refaktorering
En central del af vores udviklingsproces har været refaktorering, som vi løbende har arbejdet med for at forbedre kodens struktur, samtidig med at funktionaliteten er bibeholdt. Et konkret eksempel på dette er brugen af tree shaking. Tree shaking hjælper med at fjerne ubrugte kodefunktioner under produktionen og reducerer dermed filstørrelsen. Dette gør frontenden både hurtigere og mere effektiv, hvilket er særligt godt, når vi arbejder med Vue 3.

## Navigation

- [Start Projektet](startprojekt.md)
- [Git](git.md)
- [Start side](index.md)