const playwright = require('playwright');

const url = 'http://localhost:2368/ghost';

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './pagina.png'})
    await page.click('css=button')
    await new Promise(r => setTimeout(r, 9000));
    await page.screenshot({path: './pagina2.png'})
    console.log('Project loaded')


    

    //Interactuar con la aplicación web
    //...

    //Finalizar la prueba
    await browser.close();
  }
  return;
})();//Llamado propio de la función