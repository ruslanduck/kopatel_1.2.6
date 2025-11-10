import * as TelegramC3 from "./Telegram/telegramAPI.js";
import PLAYER_DATA from "./Data/playerData.js";
import EnemyTypes from "./Data/enemiesData.js";
import * as myGameAnalytics from "./myGameAnalytics.js";

const scriptsInEvents = {

	async Es_dataextension_Event4_Act1(runtime, localVars)
	{
		const object = JSON.parse(localVars.dictionaryJson);
		const json = JSON.stringify(object.data);
		runtime.setReturnValue(json);
	},

	async Es_dataextension_Event5_Act1(runtime, localVars)
	{
		runtime.setReturnValue(localVars.value);
	},

	async Es_dataextension_Event6_Act2(runtime, localVars)
	{
		let object = {
		  [localVars.key]: !Number.isNaN(Number(localVars.value)) ? Number(localVars.value) : localVars.value
		};
		runtime.setReturnValue(JSON.stringify(object));
	},

	async Es_telegram_Event4_Act1(runtime, localVars)
	{
		TelegramC3.loadTelegramSDK(function() {
			runtime.callFunction("OnTWALoaded");
		});
	},

	async Es_telegram_Event5_Act1(runtime, localVars)
	{
		console.warn("Telegram Web Apps SDK уже инициализирован")
	},

	async Es_telegram_Event6_Act2(runtime, localVars)
	{
		let userTG = TelegramC3.getTelegramUserInfo();
		if (userTG) {
		    runtime.globalVars.ID = userTG.id;
		}
		
	},

	async Es_gameanalytics_Event5_Act9(runtime, localVars)
	{
		console.log("GA Initialize user id: ", runtime.globalVars.ID);
	},

	async Es_gameanalytics_Event5_Act10(runtime, localVars)
	{
		GameAnalytics && GameAnalytics("configureUserId", runtime.globalVars.ID);
		GameAnalytics && GameAnalytics("setExternalUserId", runtime.globalVars.ID);
	},

	async Es_gameanalytics_Event5_Act14(runtime, localVars)
	{
		console.log("GA Initialized")
	},

	async Es_gameanalytics_Event6_Act1(runtime, localVars)
	{

	},

	async Es_gameanalytics_Event7_Act1(runtime, localVars)
	{
		console.warn("GameAnalytics уже инициализирован")
	},

	async Digging_sheet_Event614_Act1(runtime, localVars)
	{
		runtime.setReturnValue(EnemyTypes[localVars.i_enemyType]);
	},

	async Base_sheet_Event359(runtime, localVars)
	{
		runtime.globalVars.NowISO = new Date().toISOString();
	},

	async General_Event19_Act1(runtime, localVars)
	{
		localVars.playerDataJJON = JSON.stringify(PLAYER_DATA);
	},

	async General_Event30_Act51(runtime, localVars)
	{
		const params = new URLSearchParams(window.location.search);
		let rawName = params.get("name");
		if (rawName) {
		    try {
		        rawName = decodeURIComponent(rawName);
		    } catch (e) {
		        // fallback if decodeURIComponent fails
		        console.warn("Could not decode name, using raw value instead.");
		    }
		    runtime.globalVars.name = rawName;
		}
		
	},

	async General_Event36_Act1(runtime, localVars)
	{
		// Объект с полями
		const fields = {
		    "health": runtime.globalVars.Health,
		    "energy": runtime.globalVars.Energy,
		    "mood": runtime.globalVars.Happiness,
		    "hunger": runtime.globalVars.Hunger,
		    "purity": runtime.globalVars.Purity,
		    "balance": runtime.globalVars.Current_money,
		    "is_sleeping": runtime.globalVars.Sleep,
		    "is_dead": runtime.globalVars.death,
		    "music": runtime.globalVars.music,
		    "sound": runtime.globalVars.sound,
		    "adventure_tutorial_completed": runtime.globalVars.DiggingTutorial,
		    "base_tutorial_completed": runtime.globalVars.BaseTutorial,
		    "aidShopLvl": runtime.globalVars.AidShopLvl,
		    "washShopLvl": runtime.globalVars.WashShopLvl,
		    "foodShopLvl": runtime.globalVars.FoodShopLvl,
		    "SubLevel": runtime.globalVars.Level,
		    "CurrentMission": runtime.globalVars.CurrentMission,
		    "Recipe": runtime.globalVars.Recipe,
		    "health_buff_lvl": runtime.globalVars.Lvl_Health,
		    "energy_buff_lvl": runtime.globalVars.Lvl_Energy,
		    "mood_buff_lvl": runtime.globalVars.Lvl_Happiness,
		    "hunger_buff_lvl": runtime.globalVars.Lvl_Hunger,
		    "purity_buff_lvl": runtime.globalVars.Lvl_Purity,
		    "hourly_offline_buff_lvl": runtime.globalVars.Lvl_Reward,
		    "pickaxe_power_buff_lvl": runtime.globalVars.Lvl_Power,
		    "sleep_boost_lvl": runtime.globalVars.Lvl_Sleep,
		    "hourly_loss_stat_buff_lvl": runtime.globalVars.Lvl_StatDrop,
		    "locker_ammount": runtime.globalVars.Lockers,
		    "locker_progress": runtime.globalVars.LockerProgresBar,
		    "weekly_purity_stats": runtime.globalVars.OverallAddedSTATS,
		    "weekly_fighting_place": runtime.globalVars.weekly_fighting_place,
		    "weekly_mining_place": runtime.globalVars.weekly_mining_place,
		    "weekly_purity_place": runtime.globalVars.weekly_purity_place,
			"weekly_mining_stats": runtime.globalVars.DeepCompleted
		};
		
		localVars.fields = JSON.stringify(fields);
		
		
	},

	async General_Event38_Act1(runtime, localVars)
	{
		// Payload
		const payload = {
		    "records": [
		        {
		            "id": runtime.globalVars.RecordID,
		            "fields": JSON.parse(localVars.fieldsJSON)
		        }
		    ]
		};
		
		// Конвертация в JSON-строку
		localVars.payload = JSON.stringify(payload);
	},

	async General_Event39_Act1(runtime, localVars)
	{
		console.log("PatchToAirtable, fields: ", JSON.parse(localVars.fieldsJSON));
	},

	async Dataloader_sheet_Event3_Act1(runtime, localVars)
	{
		window.Telegram.WebApp.requestFullscreen();
	},

	async Dataloader_sheet_Event8_Act1(runtime, localVars)
	{
		// Payload
		const payload = {
		    "id": parseInt(runtime.globalVars.ID)
		};
		
		// Конвертация в JSON-строку
		localVars.payload = JSON.stringify(payload);
		console.log("---");
		console.log(JSON.stringify(payload));
	},

	async Es_dev_Event5_Act1(runtime, localVars)
	{
		console.log("PLAYER DATA CONST: ", PLAYER_DATA);
	},

	async Es_loading_Event6_Act1(runtime, localVars)
	{
		window.Telegram.WebApp.expand();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
