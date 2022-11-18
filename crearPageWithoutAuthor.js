
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
	await page.screenshot({path: './resultado/page/crearPageWithoutAuthor/1. Inicio.png'});
    
	await page.type('input[name="identification"]', user);
    await page.type('input[name="password"]', password);
	
	console.log('2.Ingresar datos para autenticarse')
	await page.screenshot({path:'./resultado/page/crearPageWithoutAuthor/2.Datos_autenticarse.png'});
    await page.locator('button', { hasText: 'Sign in →' }).click();
	
	await new Promise(r => setTimeout(r, 7000));
	console.log('3. Autenticado con Exito');
    await page.screenshot({path:'./resultado/page/crearPageWithoutAuthor/3.Autenticacion_exitosa.png'});

	await page.click('text=Pages');
	console.log('4. Ingresar a opción de menú pages');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageWithoutAuthor/4.Ingreso_pages.png'});
	
	await page.click('text=New page');
	console.log('5. Nueva pagina');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageWithoutAuthor/5.Nueva_pagina.png'});
	
    const tittle =  'page without author';
	await page.type("textarea[placeholder='Page title']", tittle);
	console.log('6. Ingresar titulo');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/page/crearPageWithoutAuthor/6.Titulo.png'});
	
    await page.click(".gh-btn:nth-child(2)");
    await new Promise(r => setTimeout(r, 1000));

    await page.click(".ember-power-select-multiple-remove-btn");
    await new Promise(r => setTimeout(r, 1000));

    console.log(await page.locator('text=At least one author is required.').count()>0)
    
    await browser.close();
  }
  return;
})();