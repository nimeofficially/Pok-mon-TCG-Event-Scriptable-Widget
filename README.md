# Scriptable Widget Installationsanleitung

Diese Anleitung hilft dir dabei, das Scriptable Widget zu installieren und zu konfigurieren, das aktuelle und bevorstehende Events in einem großen Widget anzeigt, wobei die Daten von einer externen API abgerufen werden.

## Funktionen
- Zeigt eine Liste von Events, einschließlich der aktuellen und bevorstehenden Events.
- Ruft Event-Daten von der API ab: `https://api.dotgg.gg/do.php?cmd=gettimedposts&blogID=51&cache=1732629600000`.
- Zeigt Event-Bilder, Titel und Daten an.
- Zeigt einen Countdown für jedes Event, der die verbleibende Zeit bis zum Ende des Events anzeigt.

## Voraussetzungen
- **iOS-Gerät** mit der **Scriptable**-App (verfügbar im App Store).
- Eine Internetverbindung, um die Daten von der API abzurufen.
  
## Installationsschritte

### Schritt 1: Installiere die Scriptable-App
1. Lade **[Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188)** aus dem App Store herunter.
2. Öffne die Scriptable-App nach der Installation.

### Schritt 2: Füge das Skript hinzu
1. Öffne Scriptable und tippe auf das `+`-Symbol oben rechts, um ein neues Skript zu erstellen.
2. Kopiere den oben stehenden Code in die neue Skriptdatei.
3. Tippe auf **Fertig**, um das Skript zu speichern.

### Schritt 3: Richte das Widget ein
1. Nachdem das Skript gespeichert wurde, tippe auf den **Run**-Button am unteren Bildschirmrand, um das Skript auszuführen. Dies erzeugt eine Vorschau des Widgets in Scriptable.
2. Um das Widget auf deinem Home-Screen hinzuzufügen:
   - Halte den Home-Bildschirm gedrückt, um in den **Jiggle-Modus** zu gelangen.
   - Tippe auf das **+**-Symbol oben links.
   - Suche nach **Scriptable** und wähle es aus.
   - Wähle die Option **Large Widget**.
   - Tippe auf **Widget hinzufügen**.
3. Sobald das Widget hinzugefügt ist, tippe auf das Widget, um es zu konfigurieren.
   - Wähle das gerade erstellte Skript aus.
   - Tippe auf **Fertig**, um die Änderungen anzuwenden.

### Schritt 4: Genieße das Widget
- Das Widget zeigt nun aktuelle und bevorstehende Events an, mit Countdown-Timern, Bildern und Links zu den Eventdetails.

## Skript-Details

### Datenquelle
- Das Widget ruft Event-Daten von der API ab: `https://api.dotgg.gg/do.php?cmd=gettimedposts&blogID=51&cache=1732629600000`.
- Es verarbeitet und zeigt Events in zwei Kategorien an:
  - **Aktuelle Events**: Events, die gerade stattfinden.
  - **Anstehende Events**: Events, die in der Zukunft stattfinden werden.

### Widget-Layout
- Zeigt bis zu 5 Events pro Seite an.
- Jedes Event enthält:
  - Den Event-Titel, der bei Bedarf gekürzt wird.
  - Das Start- und Enddatum des Events.
  - Einen Countdown, der die verbleibenden Tage und Stunden anzeigt.
  - Ein Event-Bild (wenn verfügbar), oder ein Platzhaltertext "IMG", wenn kein Bild gefunden wird.
