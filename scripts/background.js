console.log("MySkEnchanter/scripts/background.js:LOADED")

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status == "complete"){
        if (tab.url === "https://www.mysk.school/classes" || tab.url === "https://www.mysk.school/en-US/classes") {
          browser.tabs.remove(tabId);
          if (tab.url === "https://www.mysk.school/classes"){
            browser.tabs.create({ url: `https://www.mysk.school/classes?ske=true&ske_tab_index=${tab.index}` });
          } else if (tab.url === "https://www.mysk.school/en-US/classes"){
            browser.tabs.create({ url: `https://www.mysk.school/en-US/classes?ske=true&ske_tab_index=${tab.index}` });
          }
          
      } else if (tab.url.startsWith("https://www.mysk.school/classes?ske=true") || tab.url.startsWith("https://www.mysk.school/en-US/classes?ske=true")) {
          const url = new URL(tab.url);
          const decodedSearchParams = new URLSearchParams(url.searchParams);
          const tabIndex = decodedSearchParams.get("ske_tab_index");
          moveToFirstPosition(tabId,parseInt(tabIndex))
      }
    }
  });
  

  async function moveToFirstPosition(tabId,index) {
    try {
      await browser.tabs.move(tabId, {index: index});
    } catch (error) {
      if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
        setTimeout(() => moveToFirstPosition(tabId), 50);
      } else {
        console.error(error);
      }
    }
  }