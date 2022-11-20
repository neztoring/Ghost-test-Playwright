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
    console.log('1. Incio');
	await page.screenshot({path: './resultado/1. Inicio.png'});
    

	await page.type('input[name="identification"]', 'n.pereze@uniandes.edu.co');
    await page.type('input[name="password"]', 'Maleja2016');
	
	console.log('2.Ingresar datos para autenticarse')
	await page.screenshot({path:'./resultado/2.Datos_autenticarse.png'});
    await page.locator('button', { hasText: 'Sign in →' }).click();
	
	await new Promise(r => setTimeout(r, 7000));
	console.log('3. Autenticado con Exito');
    await page.screenshot({path:'./resultado/3.Autenticacion_exitosa.png'});
	

	await page.click('text=Tags');
	console.log('4. Ingresar a opción de menú Tags');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/4.Ingreso_Tags.png'});
	
	await page.click('text=New tag');
	console.log('5. Nuevo Tag');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/5.Nuevo_Tag.png'});
	
	
	await page.type('input[id="tag-name"]', 'Productos Fabricados');
	await page.click('text=Save');
	console.log('6. Ingresar Nuevo Tag');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/6.Datos_Nuevo_Tag.png'});
	
	await page.click('text=Save');
	console.log('7. Guardar Nuevo Tag');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/7.Guardar_Nuevo_Tag.png'});
	
	await page.click('text=Tags');
	console.log('8. Ingresar a opción de menú Tags');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/8.Ingreso_Tags.png'});
	
	
	await page.click('text=Productos Fabricados');
	console.log('9. Editar Tag');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/9.Editar_Tag.png'});
	
	
	
    await browser.close();
  }
  return;
})();//Llamado propio de la función