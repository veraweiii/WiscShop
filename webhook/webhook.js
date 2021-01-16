const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const fetch = require('node-fetch')
const base64 = require('base-64')

let username = "";
let password = "";
let token = "";

async function postUserMessage(message) {
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    body: JSON.stringify({
      "isUser": true,
      "text": message,
  }),
    redirect: 'follow'
  }

  await fetch('https://mysqlcs639.cs.wisc.edu/application/messages', request)
}

async function postAgentMessage(agent, message) {
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    body: JSON.stringify({
      "isUser": false,
      "text": message,
  }),
    redirect: 'follow'
  }
  console.log("Message: " + message);
  console.log("Token: " + token);
  console.log("Username: " + username);
  console.log("Password: " + password);
  agent.add(message);
  await fetch('https://mysqlcs639.cs.wisc.edu/application/messages', request);
}

async function getToken () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Basic '+ base64.encode(username + ':' + password)},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/login',request)
  const serverResponse = await serverReturn.json()
  token = serverResponse.token

  return token;
}

async function getCategoriesFetch() {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},

    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/categories',request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function getTagsFetch(category) {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},

    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/categories/' + category + '/tags/' ,request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function addTagFetch(tag) {
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags/' + tag, request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function removeTagFetch(tag) {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags/' + tag, request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function getAllSelectedTagsFetch() {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags', request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function clearAllTagsFetch() {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags', request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function getCartFetch() {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products', request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function addCartFetch(productId) {
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products/' + productId, request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function deleteCartFetch(productId) {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products/' + productId, request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function getProductsFetch() {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},

    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/products' ,request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function getReviews(productId) {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},

    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/products/' + productId + '/reviews', request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function navigateTo(page, back) {
  let json = '';
  if (back === true) {
    json = JSON.stringify({
      "back": true
    })
  } else {
    json = JSON.stringify({
      "back": false,
      "page": page
    })
  }
  let request = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
  body: json,
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application', request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function clearCart() {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products', request)
  const serverResponse = await serverReturn.json()
 
  return serverResponse;
}

async function clearMessages() {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/messages/', request)
}

app.get('/', (req, res) => res.send('online'))
app.post('/', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome () {
    agent.add('Webhook works!')
  }

  async function login () {
    // You need to set this from `username` entity that you declare in DialogFlow
    username = agent.parameters['ws-username']
    // You need to set this from password entity that you declare in DialogFlow
    password = agent.parameters['ws-password']
    await getToken()
    await clearMessages();
    if(token === "" || typeof token === 'undefined') {
      await postAgentMessage(agent, "I am sorry, but there might be something wrong with your username or password");
    }
    
    await postAgentMessage(agent, 'Logged in! Welcome to WiscShop, ' + username + '!')
    // await postAgentMessage(agent, 'Logged in! Welcome to WiscShop!')
  }

  async function getCategories() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list categories!');
      return;
    }
    await postUserMessage(agent.query);
    let categories = await getCategoriesFetch();

    let categoryText = '';
    for (const cat of categories['categories']) {
      categoryText += cat;
      categoryText += ' ';
    }

    await postAgentMessage(agent, 'There are the following categories:');
    await postAgentMessage(agent, categoryText);
  }

  async function getTags() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list tags for category!');
      return;
    }
    await postUserMessage(agent.query);
    let categoryParam = agent.parameters['ws-category'];
    
    let tags = await getTagsFetch(categoryParam);
    
    let tagText = '';
    for (const tag of tags['tags']) {
      tagText += tag;
      tagText += ' ';
    }

    await postAgentMessage(agent, 'The category ' + categoryParam + ' has the following tags: ');
    await postAgentMessage(agent, tagText);
  }

  async function getCategoryInfo() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list tags for category!');
      return;
    }
    await postUserMessage(agent.query);
    let category = agent.parameters['ws-category'];

    let tags = await getTagsFetch(category);

    let products = await getProductsFetch();
    
    let tagText = '';
    for (const tag of tags['tags']) {
      tagText += tag;
      tagText += ', ';
    }

    tagText = tagText.slice(0, -2);

    let productsText = '';
    for (const product of products['products']) {
      if (product['category'].toUpperCase() === category.toUpperCase()) {
        productsText += product['name'];
        productsText += ', ';
      }
    }

    productsText = productsText.slice(0, -2);

    await postAgentMessage(agent, 'The ' + category + ' category has the tags ' + tagText + ', and the following products: ');
    await postAgentMessage(agent, productsText);
  }

  async function getCartPrice() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to get cart total!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getCartFetch();
    let price = 0.0;

    for (const product of products['products']) {
      price += (product['price'] * product['count']);
    }

    if (price == 0.0) {
      await postAgentMessage(agent, 'Your cart is empty!');
    } else {
      await postAgentMessage(agent, 'Your cart total is $' + price + '.')
    }
  }

  async function getCartItems() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to get cart items!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getCartFetch();

    await navigateTo('/' + username + '/cart', false);

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'Your cart is empty!');
    } else {

      let productText = '';

      for (const product of products['products']) {
        productText += product['name'] + ', ';
      }

      productText = productText.slice(0, -2);
      await postAgentMessage(agent, 'You have the following ' + products['products'].length + ' unique items in your cart:');
      await postAgentMessage(agent, productText);
    }
  }

  async function getCartItemAmount() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to get cart information!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getCartFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'Your cart is empty!');
    } else {

      let count = 0;

      for (const product of products['products']) {
        count += product['count'];
      }

      await postAgentMessage(agent, 'You have ' + products['products'].length + ' unique items in your cart and ' + count + ' total items.');
    }
  }

  async function getProductInfo() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to get product info!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getProductsFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'There are no products at this time.');
    } else {

      let productName = agent.parameters['product'];

      let found = false;

      for (const product of products['products']) {
        if (product['name'].toUpperCase() === productName.toUpperCase()) {
          await navigateTo('/' + username + '/' + product['category'] + '/products/' + product['id'], false);
          await postAgentMessage(agent, "I can definitely tell you more about " + productName + '!');
          await postAgentMessage(agent, "It's in the category " + product['category'] + ' and costs $' + product['price'] + '.')
          await postAgentMessage(agent, 'It has a description of "' + product['description'] + '".');
          found = true;
          break;
        }
      }

      if (found === false) {
        await postAgentMessage(agent, 'There are no corresponding items, try something else.');
      }
    }
  }

  async function getProductReviews() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to view product reviews!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getProductsFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'There are no products at this time.');
    } else {

      let productName = agent.getContext('getproductinfo-followup')['parameters']['product'];

      let found = false;

      for (const product of products['products']) {
        if (product['name'].toUpperCase() === productName.toUpperCase()) {
          let id = product['id'];
          found = true;
          let reviews = await getReviews(id);
          await postAgentMessage(agent, 'Here are ' + reviews['reviews'].length + ' reviews for ' + productName + ':')
          for (const review of reviews['reviews']) {
            await postAgentMessage(agent, 'Title: ' + review['title']);
            await postAgentMessage(agent, 'Stars: ' + review['stars']); 
            await postAgentMessage(agent, 'Review: ' + review['text']);
          }
          break;
        }
      }

      if (found === false) {
        await postAgentMessage(agent, 'There are no corresponding items, try something else.');
      }
    }
  }

  async function getProductRating() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to view product ratings!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getProductsFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'There are no products at this time.');
    } else {

      let productName = agent.getContext('getproductinfo-followup')['parameters']['product'];

      let found = false;

      for (const product of products['products']) {
        if (product['name'].toUpperCase() === productName.toUpperCase()) {
          let id = product['id'];
          found = true;
          let reviews = await getReviews(id);
          let count = 0;
          for (const review of reviews['reviews']) {
            count += review['stars'];
          }

          await postAgentMessage(agent, productName + "'s average rating is " + (count / reviews['reviews'].length) + ' / 5.')
          break;
        }
      }

      if (found === false) {
        await postAgentMessage(agent, 'There are no corresponding items, try something else.');
      }
    }
  }

  async function addPastToCart() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to add to cart!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getProductsFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'There are no products at this time.');
    } else {

      let productName = agent.getContext('getproductinfo-followup')['parameters']['product'];

      let found = false;

      for (const product of products['products']) {
        if (product['name'].toUpperCase() === productName.toUpperCase()) {
          let id = product['id'];
          found = true;
          await addCartFetch(id);

          await postAgentMessage(agent, 'Added ' + productName + ' to your cart!')
          break;
        }
      }

      if (found === false) {
        await postAgentMessage(agent, 'There are no corresponding items, try something else.');
      }
    }
  }

  async function addToCart() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to add to cart!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getProductsFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'There are no products at this time.');
    } else {

      let productName = agent.parameters['product'];

      let found = false;

      for (const product of products['products']) {
        if (product['name'].toUpperCase() === productName.toUpperCase()) {
          let id = product['id'];
          found = true;
          let amount = 1;
          if (agent.parameters['amount'] !== undefined && agent.parameters['null'] !== null) {
            amount = agent.parameters['amount'];
          }
          if (amount <= 0) {
            amount = 1;
          }
          for (let i = 0; i < amount; i++) {
            await addCartFetch(id);
          }

          await postAgentMessage(agent, 'Added ' + amount + ' of ' + productName + ' to your cart!')
          break;
        }
      }

      if (found === false) {
        await postAgentMessage(agent, 'There are no corresponding items, try something else.');
      }
    }
  }

  async function removeFromCart() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to remove from cart!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getProductsFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'There are no products at this time.');
    } else {


      let found = false;
      let productName = agent.parameters['product'];

      for (const product of products['products']) {
        if (product['name'].toUpperCase() === productName.toUpperCase()) {
          let id = product['id'];
          found = true;
          let amount = 1;
          if (agent.parameters['amount'] !== undefined && agent.parameters['null'] !== null) {
            amount = agent.parameters['amount'];
          }
          if (amount <= 0) {
            amount = 1;
          }
          for (let i = 0; i < amount; i++) {
            await deleteCartFetch(id);
          }

          await postAgentMessage(agent, 'Removed ' + amount + ' of ' + productName + ' from your cart!')
          break;
        }
      }

      if (found === false) {
        await postAgentMessage(agent, 'There are no corresponding items, try something else.');
      }
    }
  }

  async function reviewCart() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to review your cart!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getCartFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'Your cart is empty!');
    } else {

      let cost = 0;

      await navigateTo('/' + username + '/cart-review', false);

      await postAgentMessage(agent, "Here's a review of your cart...")

      for (const product of products['products']) {
        let itemCost = (product['count'] * product['price']);
        cost += itemCost;
        await postAgentMessage(agent, product['count'] + ' of ' + product['name'] + ' for a price of ' + itemCost + '.');
      }

      await postAgentMessage(agent, 'Then your total cart cost is $' + cost + '.');
      await postAgentMessage(agent, 'Let me know if you want to confirm cart.');
    }
  }

  async function confirmCart() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to checkout!');
      return;
    }
    await postUserMessage(agent.query);

    let products = await getCartFetch();

    if (products['products'].length == 0) {
      await postAgentMessage(agent, 'Your cart is empty!');
    } else {

      let cost = 0;

      for (const product of products['products']) {
        let itemCost = (product['count'] * product['price']);
        cost += itemCost;
      }

      await navigateTo('/' + username + '/cart-confirmed', false)
      await postAgentMessage(agent, 'Checked out for a total of $' + cost + '.');
    }
  }

  async function backHome() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to go home!');
      return;
    }
    await postUserMessage(agent.query);

    await navigateTo('/' + username, false);
    await postAgentMessage(agent, 'Welcome to WiscShop!');
  }

  async function goBack() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to go back!');
      return;
    }
    await postUserMessage(agent.query);

    await navigateTo('/', true);
    await postAgentMessage(agent, 'Navigated back!');
  }

  async function showCategory() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to show categories!');
      return;
    }
    await postUserMessage(agent.query);

    let category = agent.parameters['ws-category']

    let categories = await getCategoriesFetch();

    let found = false;
    for (const cat of categories['categories']) {
      if (cat.toUpperCase() === category.toUpperCase()) {
        found = true;
        break;
      }
    }

    if (found == false) {
      await postAgentMessage(agent, 'No category of this type was found, try again!');
      return;
    }

    await postAgentMessage(agent, 'Navigating to the ' + category + "....");
    await navigateTo('/' + username + '/' + category, false);
  }

  async function logOut() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list categories!');
      return;
    }
    await postUserMessage(agent.query);
    await postAgentMessage(agent, 'Logging you out. Come again!');
    await clearMessages();

    username = "";
    password = "";
    token = "";
    //await postAgentMessage(agent, 'Successfully logged you out. Come again!.');
  }

  async function getSelectedTags() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list categories!');
      return;
    }
    await postUserMessage(agent.query);

    let tags = await getAllSelectedTagsFetch();

    let tagsText = '';

    for (const tag of tags['tags']) {
      tagsText += tag + ', ';
    }

    tagsText = tagsText.slice(0, -2);

    await postAgentMessage(agent, 'You currently have the tags ' + tagsText + " selected.");
  }

  async function clearSelectedTags() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list categories!');
      return;
    }
    await postUserMessage(agent.query);

    await clearAllTagsFetch();

    await postAgentMessage(agent, 'Cleared all selected tags.');
  }

  async function addTag() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to list categories!');
      return;
    }
    await postUserMessage(agent.query);

    let tagName = agent.parameters['ws-tag'];

    const result = await addTagFetch(tagName);
    if (result['message'] === 'Tag not found!') {
      await postAgentMessage(agent, 'Tag ' + tagName + ' does not exist.');
    } else {
      await postAgentMessage(agent, 'Tag ' + tagName + ' selected.');
    }

  }

  async function removeTag() {
    if (token === undefined || token == null) {
      agent.add('You must be logged in to unselect tags!');
      return;
    }
    await postUserMessage(agent.query);

    let tagName = agent.parameters['ws-tag'];

    const result = await removeTagFetch(tagName);
    if (result['message'] === 'Tag not found!') {
      await postAgentMessage(agent, 'Tag ' + tagName + ' does not exist.');
    } else {
      await postAgentMessage(agent, 'Tag ' + tagName + ' unselected.');
    }

  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Login', login) 
  intentMap.set('Login2', login)
  intentMap.set('get categories', getCategories)
  intentMap.set('get tags', getTags)
  intentMap.set('get cart price', getCartPrice)
  intentMap.set('get cart items', getCartItems)
  intentMap.set('get cart item amount', getCartItemAmount)
  intentMap.set('get product info', getProductInfo)
  intentMap.set('get category info', getCategoryInfo)
  intentMap.set('get product info - reviews', getProductReviews)
  intentMap.set('get product info - ratings', getProductRating);
  intentMap.set('get product info - add', addPastToCart);
  intentMap.set('add to cart', addToCart);
  intentMap.set('remove from cart', removeFromCart);
  intentMap.set('review cart', reviewCart);
  intentMap.set('confirm cart', confirmCart);
  intentMap.set('homepage', backHome);
  intentMap.set('go back', goBack);
  intentMap.set('show category', showCategory);
  intentMap.set('add tag', addTag);
  intentMap.set('remove tag', removeTag);
  intentMap.set('logout', logOut);
  intentMap.set('get selected tags', getSelectedTags);
  intentMap.set('clear selected tags', clearSelectedTags);
  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 8080)
