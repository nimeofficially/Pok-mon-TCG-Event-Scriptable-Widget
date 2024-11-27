/**
 * Script developed by nimeofficially
 * This script displays current and upcoming events in a large widget
 * with data fetched from an external API.
 */

const API_URL = "https://api.dotgg.gg/do.php?cmd=gettimedposts&blogID=51&cache=1732629600000";
const widget = new ListWidget();
widget.backgroundColor = new Color("#000000");

const request = new Request(API_URL);
request.timeoutInterval = 30;
const data = await request.loadJSON();

const currentPage = 2;
const eventsPerPage = 5;

let eventsToShow = [];
const now = new Date();
let pageTitle = "";

if (currentPage === 1) {
  eventsToShow = data.filter((event) => {
    const startDate = new Date(event.date_binding);
    const endDate = new Date(event.date_binding_end);
    return now >= startDate && now <= endDate;
  });
  pageTitle = "Aktuelle Events";
} else {
  eventsToShow = data.filter((event) => {
    const startDate = new Date(event.date_binding);
    return now < startDate;
  });
  pageTitle = "Anstehende Events";
}

const hasEvents = eventsToShow.length > 0;
let pageEvents = eventsToShow.slice(0, eventsPerPage);

for (const event of pageEvents) {
  const startDate = new Date(event.date_binding);
  const endDate = new Date(event.date_binding_end);

  const eventStack = widget.addStack();
  eventStack.layoutHorizontally();
  eventStack.centerAlignContent();
  eventStack.setPadding(5, 10, 5, 10);

  let img = await loadImage(event.guid);
  if (img) {
    const imgWidget = eventStack.addImage(img);
    imgWidget.imageSize = new Size(50, 50);
    imgWidget.cornerRadius = 10;
  } else {
    const placeholder = eventStack.addText("IMG");
    placeholder.textColor = Color.gray();
    placeholder.font = Font.mediumSystemFont(12);
    placeholder.centerAlignText();
  }

  eventStack.addSpacer(10);

  const textStack = eventStack.addStack();
  textStack.layoutVertically();
  textStack.centerAlignContent();

  const maxLength = 30;
  const shortTitle =
    event.post_title.length > maxLength
      ? event.post_title.substring(0, maxLength) + "..."
      : event.post_title;

  const titleLink = `https://ptcgpocket.gg/?p=${event.ID}`;
  const title = textStack.addText(shortTitle);
  title.textColor = Color.white();
  title.font = Font.boldSystemFont(14);
  title.lineLimit = 1;
  title.url = titleLink;

  const dateRange = `${formatDateGerman(event.date_binding)} - ${formatDateGerman(event.date_binding_end)}`;
  const date = textStack.addText(dateRange);
  date.textColor = new Color("#F79237");
  date.font = Font.mediumSystemFont(12);

  eventStack.addSpacer();

  const remainingTimeStack = eventStack.addStack();
  remainingTimeStack.backgroundColor = new Color("#F79237");
  remainingTimeStack.cornerRadius = 10;
  remainingTimeStack.setPadding(5, 10, 5, 10);

  const timeLeft = calculateRemainingTime(now, endDate);
  const timeLeftText = remainingTimeStack.addText(timeLeft);
  timeLeftText.textColor = Color.black();
  timeLeftText.font = Font.mediumSystemFont(12);

  widget.addSpacer(8);
}

if (!hasEvents) {
  const noEventText = widget.addText("Keine Events verfügbar");
  noEventText.textColor = Color.gray();
  noEventText.font = Font.mediumSystemFont(14);
  noEventText.centerAlignText();
}

const pageIndicator = widget.addStack();
pageIndicator.layoutHorizontally();
pageIndicator.centerAlignContent();

const pageTitleText = pageIndicator.addText(pageTitle);
pageTitleText.textColor = Color.gray();
pageTitleText.font = Font.regularSystemFont(12);

pageIndicator.addSpacer();

const sourceText = pageIndicator.addText("source: ptcgpocket.gg");
sourceText.textColor = Color.gray();
sourceText.font = Font.regularSystemFont(10);
sourceText.rightAlignText();

widget.presentLarge();
Script.setWidget(widget);
Script.complete();

async function loadImage(url) {
  try {
    const req = new Request(url);
    const image = await req.loadImage();
    return image;
  } catch (e) {
    console.error("Fehler beim Laden des Bildes: ", e);
    return null;
  }
}

function calculateRemainingTime(start, end) {
  const diff = Math.max(0, end - start);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h übrig`;
}

function formatDateGerman(dateString) {
  const options = { timeZone: "Europe/Berlin", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString.replace(" ", "T")).toLocaleString("de-DE", options);
}
