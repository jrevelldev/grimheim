import { BLOG_POSTS, BLOG_CATEGORIES, formatDate, getPostsByCategory, getPostById } from './data/blog.js';
import { displayModal, hideModal } from './utility.js';

let currentCategory = 'all';
let currentPost = null;

/**
 * Initialize the blog system
 */
export const initializeBlog = () => {
    // Clear any existing content to force refresh
    const categoriesContainer = document.getElementById('blog-categories');
    const postsContainer = document.getElementById('blog-posts-list');
    
    if (categoriesContainer) categoriesContainer.innerHTML = '';
    if (postsContainer) postsContainer.innerHTML = '';
    
    // Reset state
    currentCategory = 'all';
    currentPost = null;
    
    renderBlogCategories();
    renderBlogPosts();
    setupBlogEventListeners();
};

/**
 * Render blog category navigation
 */
const renderBlogCategories = () => {
    const categoriesContainer = document.getElementById('blog-categories');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = '';
    
    BLOG_CATEGORIES.forEach(category => {
        const categoryElement = document.createElement('button');
        categoryElement.className = `blog-category-btn ${currentCategory === category.id ? 'active' : ''}`;
        categoryElement.dataset.category = category.id;
        categoryElement.innerHTML = `
            <i class="${category.icon}"></i>
            <span>${category.name}</span>
        `;
        categoryElement.onclick = () => selectCategory(category.id);
        categoriesContainer.appendChild(categoryElement);
    });
};

/**
 * Render blog posts list
 */
const renderBlogPosts = () => {
    const postsContainer = document.getElementById('blog-posts-list');
    if (!postsContainer) return;

    const posts = getPostsByCategory(currentCategory);
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="text-slate-400 italic">No posts found in this category.</p>';
        return;
    }

    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post-item cursor-pointer p-4 bg-slate-800 rounded-lg border border-slate-600 hover:border-mordheim-gold transition-all';
        postElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-mordheim-gold">${post.title}</h4>
                <span class="text-xs text-slate-400 whitespace-nowrap ml-2">${formatDate(post.date)}</span>
            </div>
            <div class="text-sm text-slate-300 mb-2">${getPostExcerpt(post.content)}</div>
            <div class="flex flex-wrap gap-1">
                ${post.tags.map(tag => `<span class="text-xs bg-slate-700 px-2 py-1 rounded">${tag}</span>`).join('')}
            </div>
        `;
        postElement.onclick = () => showPost(post.id);
        postsContainer.appendChild(postElement);
    });
};

/**
 * Get a short excerpt from post content
 */
const getPostExcerpt = (content, maxLength = 150) => {
    const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
};

/**
 * Select a blog category
 */
const selectCategory = (categoryId) => {
    currentCategory = categoryId;
    currentPost = null;
    
    // Update active state
    document.querySelectorAll('.blog-category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categoryId);
    });
    
    // Show posts list view
    showPostsList();
    renderBlogPosts();
};

/**
 * Show a specific blog post
 */
export const showPost = (postId) => {
    const post = getPostById(postId);
    if (!post) return;

    currentPost = post;
    
    const postsContainer = document.getElementById('blog-posts-list');
    const backButton = document.getElementById('blog-back-button');
    
    if (postsContainer) {
        // Create the article element properly
        const article = document.createElement('article');
        article.className = 'blog-post-content';
        
        // Create header section
        const headerDiv = document.createElement('div');
        headerDiv.className = 'mb-4';
        headerDiv.innerHTML = `
            <h2 class="text-2xl font-bold text-mordheim-gold mb-2">${post.title}</h2>
            <div class="flex items-center justify-between text-sm text-slate-400 mb-4">
                <span>${formatDate(post.date)}</span>
                <div class="flex gap-1">
                    ${post.tags.map(tag => `<span class="bg-slate-700 px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Create content section
        const contentDiv = document.createElement('div');
        contentDiv.className = 'prose prose-invert max-w-none';
        contentDiv.innerHTML = post.content;
        
        // Assemble the article
        article.appendChild(headerDiv);
        article.appendChild(contentDiv);
        
        // Clear and set new content
        postsContainer.innerHTML = '';
        postsContainer.appendChild(article);
    }
    
    if (backButton) {
        backButton.classList.remove('hidden');
    }
};

/**
 * Show the posts list view
 */
const showPostsList = () => {
    renderBlogPosts();
    const backButton = document.getElementById('blog-back-button');
    if (backButton) {
        backButton.classList.add('hidden');
    }
};

/**
 * Setup blog event listeners
 */
const setupBlogEventListeners = () => {
    // Back button
    const backButton = document.getElementById('blog-back-button');
    if (backButton) {
        backButton.onclick = () => {
            currentPost = null;
            showPostsList();
        };
    }
    
    // Search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterPosts(searchTerm);
        });
    }
};

/**
 * Filter posts by search term
 */
const filterPosts = (searchTerm) => {
    const posts = getPostsByCategory(currentCategory);
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    const postsContainer = document.getElementById('blog-posts-list');
    if (!postsContainer) return;

    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = '<p class="text-slate-400 italic">No posts found matching your search.</p>';
        return;
    }

    postsContainer.innerHTML = '';
    
    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post-item cursor-pointer p-4 bg-slate-800 rounded-lg border border-slate-600 hover:border-mordheim-gold transition-all';
        postElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-mordheim-gold">${post.title}</h4>
                <span class="text-xs text-slate-400 whitespace-nowrap ml-2">${formatDate(post.date)}</span>
            </div>
            <div class="text-sm text-slate-300 mb-2">${getPostExcerpt(post.content)}</div>
            <div class="flex flex-wrap gap-1">
                ${post.tags.map(tag => `<span class="text-xs bg-slate-700 px-2 py-1 rounded">${tag}</span>`).join('')}
            </div>
        `;
        postElement.onclick = () => showPost(post.id);
        postsContainer.appendChild(postElement);
    });
};

/**
 * Open the blog modal
 */
export const openBlogModal = () => {
    displayModal('blog-modal');
    // Force re-initialization to ensure fresh content
    initializeBlog();
};
