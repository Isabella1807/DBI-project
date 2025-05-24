## Clean code og Statisk kodeanalyse
Der har været fokus på Clean Code principperne. For at mindske code smells har vi taget disse tiltag:

- camelCasing som naming convention
- ESLINT til fælles håndhævede regler
- SRP og DRY hvor koden opdeles efter ansvar og kan genbruges
- Selvdokumenterende kode, hvor variabel- og funktionsnavne beskriver formålet



**Et eksempel på, hvordan vi tiltag i praksis, denne kan genbruges fordi den ligger i en store**

```
const changeParentId = (unitId: string, newParentId: string) => {
    changeUnitParentId(unitId, newParentId).then(() => {
      visibleUnits.value = visibleUnits.value.filter(unit => unit.id !== unitId);
    }).catch(error => {
      throw new Error('Kunne ikke opdatere parent id på enhed: ' + error);
    });
  };
```

## Eslint 
Vi har brugt en række ESLint-regler for at opretholde en ensartet stil og forbedre kvaliteten af koden. 

**ESLINT-reglerne ses nedenstående:**

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

**Ikke selvdokumenterende navngivning**

For at opretholde vores egne standarder bør der ikke anvendes enkelte bogstaver som navngivning, da det kan være svært at læse og forstå koden.

- **"q"** kunne f.eks. kaldes **"query"**
- **"d"** kunne f.eks. kaldes **"queryDocument"**
```
  const q = query(
    collection(db, 'folders'),
    where('parentId', '==', currentFolderId.value),
    where('userId', '==', authStore.userId),
  );

  unsubscribe = onSnapshot(q, snap => {
    folders.value = snap.docs.map(d => ({
      id: d.id,
      name: d.data().name as string,
      selected: false,
      type: 'folder',
    }));
  });
```

## Navigation

- [Start side](index.md)
- [Git](git.md)
- [Test](test.md)
