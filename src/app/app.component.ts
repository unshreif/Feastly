import { Component, HostListener, ViewChild, ComponentRef } from '@angular/core';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  size?: string;
  addOn?: string;
  img?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'feastly';
  menuCategories = [
    'Appetizers',
    'Main Courses',
    'Pizzas',
    'Burgers',
    'Salads',
    'Desserts',
    'Beverages',
    'Specials'
  ];
  showCart = false;
  showProfileDropdown = false;
  showToast = false;
  menuOpen = false;
  showMenuSidebar = false;
  showProfileModal = false;
  private toastTimeout: any;
  cart: CartItem[] = [];
  isAuthenticated = false;

  private componentRefs: { [key: string]: ComponentRef<any> } = {};

  constructor() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.calculateTotal();
    } else {
      this.sum = 0;
    }
  }

  onActivate(componentRef: any) {
    console.log('Component activated:', componentRef.constructor.name);
    // Handle cart item added event from child components
    if (componentRef.cartItemAdded) {
      console.log('Found cartItemAdded EventEmitter on component');
      componentRef.cartItemAdded.subscribe((item: any) => {
        console.log('Received cart item:', item);
        this.onCartItemAdded(item);
      });
    } else {
      console.log('No cartItemAdded EventEmitter found on component');
    }
  }

  toggleCart() {
    this.showCart = !this.showCart;
    // Close profile dropdown when cart is opened
    if (this.showCart) {
      this.showProfileDropdown = false;
      this.menuOpen = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      // Close other overlays when opening menu
      this.showCart = false;
      this.showProfileDropdown = false;
      this.showMenuSidebar = false;
      // Add body class to prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when closing menu
      document.body.style.overflow = '';
    }
  }

  toggleMenuSidebar() {
    this.showMenuSidebar = !this.showMenuSidebar;
    if (this.showMenuSidebar) {
      // Close other overlays when opening menu sidebar
      this.showCart = false;
      this.menuOpen = false;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  openProfileModal(event: MouseEvent) {
    event.stopPropagation();
    this.showProfileModal = true;
    this.showCart = false;
    this.menuOpen = false;
    document.body.style.overflow = 'hidden';
  }

  closeProfileModal() {
    this.showProfileModal = false;
    document.body.style.overflow = '';
  }

  // Auth related methods
  sum: any;
  onSignIn() {
    // Implement sign in logic
    console.log('Sign in clicked');
    this.isAuthenticated = true;
    this.showProfileDropdown = false;
  }

  onSignUp() {
    // Implement sign up logic
    console.log('Sign up clicked');
    this.isAuthenticated = true;
    this.showProfileDropdown = false;
  }

  onSignOut() {
    // Implement sign out logic
    console.log('Sign out clicked');
    this.isAuthenticated = false;
    this.showProfileDropdown = false;
  }

  onCartItemAdded(newItem: CartItem) {
    // Find if item with same name, size, and addOn exists
    const existingIndex = this.cart.findIndex(
      item => item.name === newItem.name &&
             item.size === newItem.size &&
             item.addOn === newItem.addOn
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({...newItem, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();
    this.showToastMessage();
  }

  showToastMessage() {
    this.showToast = true;

    // Clear any existing timeout
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    // Auto-hide after 3 seconds
    this.toastTimeout = setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.showToast = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  }

  removeFromCart(item: CartItem): void {
    const index = this.cart.findIndex(cartItem =>
      cartItem.name === item.name &&
      cartItem.size === item.size &&
      cartItem.addOn === item.addOn
    );

    if (index > -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.calculateTotal();
    }
  }

  increaseQuantity(item: CartItem): void {
    const index = this.cart.findIndex(cartItem =>
      cartItem.name === item.name &&
      cartItem.size === item.size &&
      cartItem.addOn === item.addOn
    );

    if (index > -1) {
      this.cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.calculateTotal();
    }
  }

  decreaseQuantity(item: CartItem): void {
    const index = this.cart.findIndex(cartItem =>
      cartItem.name === item.name &&
      cartItem.size === item.size &&
      cartItem.addOn === item.addOn
    );

    if (index > -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.calculateTotal();
    }
  }

  private calculateTotal(): void {
    this.sum = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
