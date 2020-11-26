# M223: Punchclock
Diese Applikation verfügt über die Optionen Zeiteinträge mit einer Kategorie zu speichern. Ich habe auch versucht ein Login zu erstellen. 
Diese findet man unter `http://localhost:8081/login.html`. 
Die generiert ein JWT, der auch im LocalStorage gespeichert wird. Auch kann man ein neuen Benutzer erstellen kann.

#### Datensript

Eine Scipt wirde erstellt, wenn man au den Button im index drückt um ein paar Userdaten erstellen kann.

#### Funktionen

Man kann Einträge/Kategorien erstellen, anzeigen und löschen. 
Wenn man eine Kategorie hinzufügt, kann man danach auch einen Eintrag mit dieser Kategorie erstellen.

## Loslegen
Folgende Schritte befolgen um loszulegen:
1. Sicherstellen, dass JDK 12 installiert und in der Umgebungsvariable `path` definiert ist.
1. Ins Verzeichnis der Applikation wechseln und über die Kommandozeile mit `./gradlew bootRun` oder `./gradlew.bat bootRun` starten
1. Unittest mit `./gradlew test` oder `./gradlew.bat test` ausführen.
1. Ein ausführbares JAR kann mit `./gradlew bootJar` oder `./gradlew.bat bootJar` erstellt werden.

Folgende Dienste stehen während der Ausführung im Profil `dev` zur Verfügung:
- REST-Schnittstelle der Applikation: http://localhost:8081
- Dashboard der H2 Datenbank: http://localhost:8081/h2-console