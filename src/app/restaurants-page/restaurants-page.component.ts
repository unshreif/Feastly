import { Component, Output, EventEmitter } from '@angular/core';

interface BasketItem {
  name: string;
  size?: string;
  addOn?: string;
  price: number;
  img: string;
  quantity: number;
}

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent {
  @Output() cartItemAdded = new EventEmitter<BasketItem>();
  searchQuery = '';
  filteredMenuItems: { [key: string]: any[] } = {};

  menuTopics = [
    'Pizzas',
    'Garlic Bread',
    'Calzone',
    'Kebabs',
    'Salads',
    'Cold drinks',
    'Happy Meal',
    'Desserts',
    'Hot drinks',
    'Sauces',
    'Orbit'
  ];

  activeTopic = this.menuTopics[0];

  menuItems: { [key: string]: any[] } = {
    'Pizzas': [
      {
        name: 'Farm House Xtreme Pizza',
        desc: '1 McChicken*, 1 Big Mac*, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Deluxe Pizza',
        desc: '1 McChicken*, 1 Big Mac*, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        img: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b77?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Tandoori Pizza',
        desc: '1 McChicken*, 1 Big Mac*, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Garlic Bread': [
      {
        name: 'Classic Garlic Bread',
        desc: 'Freshly baked bread with garlic butter',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Calzone': [
      {
        name: 'Veg Calzone',
        desc: 'Stuffed with cheese and vegetables',
        img: 'https://images.unsplash.com/photo-1603079841834-1d2c7a2c2c5b?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Kebabs': [
      {
        name: 'Chicken Kebab',
        desc: 'Grilled chicken with spices',
        img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Salads': [
      {
        name: 'Greek Salad',
        desc: 'Fresh vegetables with feta cheese',
        img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Cold drinks': [
      {
        name: 'Coca Cola',
        desc: 'Chilled soft drink',
        img: 'https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Happy Meal': [
      {
        name: 'Kids Happy Meal',
        desc: 'Burger, fries, drink, and toy',
        img: 'https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Desserts': [
      {
        name: 'Chocolate Cake',
        desc: 'Rich chocolate layered cake',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Hot drinks': [
      {
        name: 'Coffee',
        desc: 'Freshly brewed coffee',
        img: 'https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Sauces': [
      {
        name: 'Garlic Sauce',
        desc: 'Creamy garlic sauce',
        img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    'Orbit': [
      {
        name: 'Orbit Gum',
        desc: 'Refreshing chewing gum',
        img: 'https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  };

  // For interactive selection
  selectedSizes: { [key: number]: string } = {};
  selectedAddOns: { [key: number]: boolean } = {};

  constructor() {
    this.filteredMenuItems = { ...this.menuItems };
  }

  getPizzaPrice(size: string): number {
    switch (size) {
      case 'Small':
        return 21.80;
      case 'Medium':
        return 25.90;
      case 'Large':
        return 27.90;
      case 'XL Large with Sauces':
        return 32.90;
      default:
        return 25.90;
    }
  }

  setActiveTopic(topic: string) {
    this.activeTopic = topic;
    this.applySearch();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    this.applySearch();
  }

  private applySearch() {
    if (!this.searchQuery.trim()) {
      this.filteredMenuItems = { ...this.menuItems };
      return;
    }

    this.filteredMenuItems = {};
    Object.keys(this.menuItems).forEach(category => {
      const filteredItems = this.menuItems[category].filter(item =>
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.desc.toLowerCase().includes(this.searchQuery)
      );
      if (filteredItems.length > 0) {
        this.filteredMenuItems[category] = filteredItems;
      }
    });
  }

  selectSize(index: number, size: string) {
    this.selectedSizes[index] = size;
    if (size === 'XL Large with Sauces') {
      this.selectedAddOns[index] = true;
    } else {
      this.selectedAddOns[index] = false;
    }
  }

  toggleAddOn(index: number) {
    if (this.selectedSizes[index] === 'XL Large with Sauces') {
      this.selectedSizes[index] = 'Medium';
      this.selectedAddOns[index] = false;
    } else {
      this.selectedSizes[index] = 'XL Large with Sauces';
      this.selectedAddOns[index] = true;
    }
  }

  addToCart(item: any, index: number) {
    let size: string | undefined;
    let addOn: string | undefined;
    let price: number;

    if (this.activeTopic === 'Pizzas') {
      size = this.selectedSizes[index] || 'Medium';
      price = this.getPizzaPrice(size);
      if (size === 'XL Large with Sauces') {
        addOn = 'XL with Sauces';
      }
    } else {
      price = 9.90; // Default price for non-pizza items
      size = undefined;
      addOn = undefined;
    }

    const basketItem: BasketItem = {
      name: item.name,
      size,
      addOn,
      price,
      img: item.img || 'assets/default-food.jpg', // Fallback image
      quantity: 1
    };

    // Emit the cart item
    if (this.cartItemAdded) {
      this.cartItemAdded.emit(basketItem);

      // Show feedback to user
      console.log('Added to cart:', basketItem);

      // Reset the selection
      if (this.activeTopic === 'Pizzas') {
        delete this.selectedSizes[index];
        delete this.selectedAddOns[index];
      }
    } else {
      console.error('cartItemAdded EventEmitter is not properly initialized');
    }
  }
}

