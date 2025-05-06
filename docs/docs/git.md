# Git

## Git og Versonsstyring
I projektet har vi brugt Git som versionsstyring. Det har gjort det muligt at holde styr på ændringer i koden og samtidig samarbejde effektivt i gruppen. Git har især været nyttigt, fordi det gemmer hele historikken over projektets udvikling og gør det nemt at gå frem og tilbage mellem tidligere versioner af koden.

**Fordele ved versionsstyring i projektet:**

- Nem adgang til tidligere versioner af koden
- Effektivt samarbejde i grupper
- Automatisk logning af ændringer og historik

## Branching strategier
Vi har valgt en simpel og struktureret branching-strategi. Alt arbejde foregår på separate grene, alt efter hvilke opgaver der skal løses. Vi har en main-gren, som kun bliver opdateret, når vi alle er enige, og koden er gennemtestet og uden fejl. Dette hjælper os med at sikre stabilitet og undgå problemer i den færdige version af projektet.

**Fordele ved denne strategi:**

- Giver bedre overblik og struktur
- Gør det nemmere at teste og godkende kode, før den implementeres
- Mindsker risikoen for fejl i den endelige version

## Git workflows

**Git Flow**

- Denne metode bruger flere grene, bl.a. main, develop, feature, release og hotfix. Det giver en tydelig struktur og egner sig godt til større projekter, hvor der er brug for at holde styr på forskellige udviklingsfaser.

**GitHub Flow**

- En enklere tilgang, som især er velegnet til webprojekter med løbende opdateringer. Her arbejder man typisk med feature branches, som bliver flettet ind i main via pull requests. Det passer godt sammen med CI/CD-processer.

**GitLab Flow**

- Bygger videre på Git Flow, men kombinerer det med GitLabs issue-håndtering. Det gør workflowet mere fleksibelt og nemt at tilpasse afhængigt af, hvordan man organiserer sit udviklingsarbejde.

## Navigation

- [Start Projektet](startprojekt.md)
- [Start side](index.md)
- [Clean Code](cleanCode.md)