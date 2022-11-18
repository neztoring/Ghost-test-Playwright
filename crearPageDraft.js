
const playwright = require('playwright');
const url = 'http://localhost:2368/ghost';
const user = 'a.alvarezh2@uniandes.edu.co';
const password = '12345abcde';


(async () => {

  for (const browserType of ['chromium']){
   
    console.log(browserType+'-------------------------------------------')

    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    console.log('1. Incio');
	await page.screenshot({path: './resultado/page/crearPageDraft/1. Inicio.png'});
    

	await page.type('input[name="identification"]', user);
    await page.type('input[name="password"]', password);
	
	console.log('2.Ingresar datos para autenticarse')
	await page.screenshot({path:'./resultado/page/crearPageDraft/2.Datos_autenticarse.png'});
    await page.locator('button', { hasText: 'Sign in →' }).click();
	
	await new Promise(r => setTimeout(r, 7000));
	console.log('3. Autenticado con Exito');
    await page.screenshot({path:'./resultado/page/crearPageDraft/3.Autenticacion_exitosa.png'});
	

	await page.click('text=Pages');
	console.log('4. Ingresar a opción de menú pages');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageDraft/4.Ingreso_pages.png'});
	
	await page.click('text=New page');
	console.log('5. Nueva pagina');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageDraft/5.Nueva_pagina.png'});
	
    const tittle =  'New page test in draft'
	await page.type("textarea[placeholder='Page title']", tittle);
	console.log('6. Ingresar titulo');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageDraft/6.Titulo.png'});
	
	await page.click(".gh-editor-back-button");
	await new Promise(r => setTimeout(r, 4000));
	await page.click(".gh-editor-back-button");
	await page.screenshot({path:'./resultado/page/crearPageDraft/7.Ingreso_page.png'});
	
    await page.click("div.gh-contentfilter-menu.gh-contentfilter-type > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger");
    await page.click(".ember-power-select-options > li:nth-child(2)");
    console.log('8. Ingresar a la lista de paginas en borrador');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageDraft/8.draft_page.png'});

    const textTitle = await page.innerText(".pages-list > li:nth-child(1) > a:nth-child(1) > h3");
    console.log(textTitle == tittle);
	
    await browser.close();
  }
  return;
})();