import test from "node:test";
import assert from "node:assert/strict";
import { crops, fish, villagers } from "../src/data/catalog.js";
import { categories, guides } from "../src/data/guides.js";
import { calculateHarvest, matches, seasons, getRoute } from "../src/lib.js";

test("all local entries have unique identifiers, valid categories, and official sources", () => {
  for (const list of [crops, fish, villagers, guides]) {
    assert.equal(new Set(list.map((x) => x.id)).size, list.length);
    for (const entry of list)
      assert.match(entry.source, /^https:\/\/(es\.)?stardewvalleywiki\.com\//);
  }
  for (const guide of guides) {
    assert.ok(categories.some((c) => c.id === guide.category));
    assert.ok(guide.sections.length >= 2);
    assert.ok(guide.sections.every((s) => s.title && s.text));
  }
  for (const crop of crops) {
    assert.ok(crop.days > 0 && crop.sell >= 0);
    assert.ok(crop.seed === null || crop.seed >= 0);
    assert.ok(crop.regrow === null || crop.regrow > 0);
    assert.ok(crop.season.every((s) => seasons.includes(s)));
  }
  for (const f of fish)
    assert.ok(
      f.time &&
        f.weather &&
        f.location &&
        f.season.every((s) => seasons.includes(s)),
    );
});

test("calendar contains 34 giftable villagers and 12 marriage candidates with valid birthdays", () => {
  assert.equal(villagers.length, 34);
  assert.equal(villagers.filter((v) => v.marriage).length, 12);
  for (const v of villagers) {
    assert.ok(v.birthday.day >= 1 && v.birthday.day <= 28);
    assert.ok(seasons.includes(v.birthday.season));
    assert.ok(v.loves.length >= 2);
  }
});

test("search ignores accents and case, and matches all words across article content", () => {
  const entry = {
    title: "Guía de pesca",
    summary: "Otoño",
    category: "pesca",
    tags: ["río"],
    sections: [{ title: "Clima", text: "Lluvia", items: ["Anguila"] }],
  };
  assert.equal(matches(entry, "GUIA otono lluvia"), true);
  assert.equal(matches(entry, "rio anguila"), true);
  assert.equal(matches(entry, "invierno"), false);
});

test("planting day is excluded and a harvest on day 28 is valid", () => {
  const crop = crops.find((c) => c.id === "parsnip");
  assert.equal(calculateHarvest(crop, 24, 1).harvests, 1);
  assert.equal(calculateHarvest(crop, 25, 1).harvests, 0);
  assert.equal(calculateHarvest(crop, 25, 1).profit, -20);
  const result = calculateHarvest(crop, 1, 20);
  assert.equal(result.harvests, 6);
  assert.equal(result.revenue, 4200);
  assert.equal(result.cost, 2400);
  assert.equal(result.profit, 1800);
});

test("regrowing crops buy seeds once and account for guaranteed multiple produce", () => {
  const berry = calculateHarvest(
    crops.find((c) => c.id === "blueberry"),
    1,
    10,
  );
  assert.equal(berry.harvests, 4);
  assert.equal(berry.yieldPerHarvest, 3);
  assert.equal(berry.revenue, 6000);
  assert.equal(berry.cost, 800);
  assert.equal(berry.profit, 5200);
  const strawberry = calculateHarvest(
    crops.find((c) => c.id === "strawberry"),
    13,
    10,
  );
  assert.equal(strawberry.harvests, 2);
  assert.equal(strawberry.cost, 1000);
});

test("unknown seed prices do not become free seeds", () => {
  const result = calculateHarvest(
    crops.find((c) => c.id === "carrot"),
    1,
    20,
  );
  assert.equal(result.cost, null);
  assert.equal(result.profit, null);
  assert.ok(result.revenue > 0);
});

test("broken percent-encoded links cannot crash the app", () => {
  assert.equal(getRoute("#articulo/chirivia"), "articulo/chirivia");
  assert.equal(getRoute("#%E0%A4%A"), "pagina-no-encontrada");
  assert.equal(getRoute(""), "inicio");
});
