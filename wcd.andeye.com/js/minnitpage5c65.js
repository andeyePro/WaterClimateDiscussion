        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
		function setDarkMode(isSet) {
			if (isSet) {
				createCookie("darkMode", 1, 365);
				$("body").addClass('minnit-dark-page');
				$("#minnit-navbar-nav").addClass('minnitnavbar-dark');
			} else {
				createCookie("darkMode", 0, 0);
				$("body").removeClass('minnit-dark-page');
				$("#minnit-navbar-nav").removeClass('minnitnavbar-dark');
			}
			return false;
		}
		function createCookie(name, value, days) {
			var expires;
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			} else expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		}
        var lang = "en";
        var chatlang = "en";
        var knownChatLangs = {
            "ar": "العربية",//arabic
            "az": "Azərbaycan", //Azərbaycan
            "sq": "Shqip", //albania
            "cs": "Čeština",//czech
            "it": "Italiano", //italian
            "el": "Ελληνικά", //greek
            "de": "Deutsch", //german
            "en": "English", //unknown
            "es": "Español", //spanish
			"ko": "한국어", //korean
            "fi": "Suomalainen", //finnish
            "fr": "Français", //french
			"he": "‫עברית", //hebrew
			"hu": "Magyar", //hungarian
			"ja": "日本語", //japanese
			"ms": "Melayu", //malay
            "ka": "ქართული", //georgian
            "nl": "Nederlands", //dutch
            "ro": "Română", //romanian
            "ru": "Русский", //russian
            "pt": "Português", //portuguese 
            "pt-br": "Português (Brasil)", //portuguese brazil
            "sr": "српски језик", //serbian
            "sk": "Slovenčina", //slovak
            "sv": "Svenska", //swedish
            "th": "ไทย", //thai
            "fa": "فارسی", //persian
            "pl": "Polski", //polish
            "zh": "简体中文", //chinese (simplified)
            "id": "Bahasa", //indonesian
            "tr": "Türkçe", //turkish
            "vi": "Tiếng Việt", //vietnamese
            "hr": "Hrvatski", //croatian
            "piglatin": "Igpa Atinla" //pig latin
        };
        var langfromcookie = getCookie("lang");
        if (knownChatLangs.hasOwnProperty(langfromcookie) && knownChatLangs.hasOwnProperty(langfromcookie)) {
            chatlang = langfromcookie;
        }
        var userlang = window.navigator.userLanguage || window.navigator.language || "en";
        if (knownChatLangs.hasOwnProperty(userlang)) {
            chatlang = userlang;
        }
        document.addEventListener("DOMContentLoaded", function(event) {
            if (navigator.userAgent && navigator.userAgent.indexOf("Windows NT 5.1") !== -1 && (navigator.userAgent.indexOf("Trident") !== -1 || navigator.userAgent.indexOf("Chrome") !== -1)){
				if (typeof(document.getElementById('outdatedbrowser'))!=='undefined' && document.getElementById('outdatedbrowser')!==null){
					document.getElementById('outdatedbrowser').classList.remove("hidden");
				}
            }
            $(".starttimestamp").each(function (index) {
                var thisDate = new Date(parseInt($(this).text()) * 1000);
                var hours = thisDate.getHours();
                var minutes = thisDate.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                $(this).text(strTime);
                $(this).removeClass();
            });
            $(".startdatestamp").each(function (index) {
                var thisDate = new Date(parseInt($(this).text()) * 1000);
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var month = monthNames[thisDate.getMonth()];
                var date = thisDate.getDate();
                var year = thisDate.getFullYear();
                var strTime = date + " "+month+", "+year;
                $(this).text(strTime);
                $(this).removeClass();
            });
            if (document.getElementById('home_navbar_link')) {
            switch (window.location.pathname.split('/').join('')) {
                case "":
                    document.getElementById('home_navbar_link').classList.add("active");
                break;
                case "discover":
                    document.getElementById('discover_navbar_link').classList.add("active");
                break;
                case "support":
                    document.getElementById('support_navbar_link').classList.add("active");
                    document.getElementById('suphome_navbar_link').classList.add("listSelected");
                break;
                case "supportopen":
                    document.getElementById('support_navbar_link').classList.add("active");
                    document.getElementById('supopen_navbar_link').classList.add("listSelected");
                break;
                case "supportview":
                    document.getElementById('support_navbar_link').classList.add("active");
                    document.getElementById('supview_navbar_link').classList.add("listSelected");
                break;
                case "register":
                    document.getElementById('register_navbar_link').classList.add("active");
                break;
                case "createchat":
                    if (document.getElementById('createchat_navbar_link')) {document.getElementById('createchat_navbar_link').classList.add("active");}
                break;
                case "emoji":
                    document.getElementById('smileymaker_navbar_link').classList.add("active");
                break;
            }
        }
            /*
            $("[data-localize]").localize("/json/pagelang", {
                language: lang,
                skipLanguage: /^en/
            });
            */
			if ($('#minnit-community').length && $('#discover_navbar_link').length) {
				$('#minnit-community').removeClass('hidden');
			}
        });
		
