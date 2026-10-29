/**
 * CareerForge - Job Portal & Prep Ecosystem
 * Main Application Logic & State Management
 */

// Application State with LocalStorage Persistence
const AppState = {
  activeTab: 'jobs',
  subTabs: {
    prep: 'aptitude',
    aptitudeSub: 'notes',
    techSub: 'notes',
    techSubject: 'os'
  },
  searchQuery: '',
  filters: {
    category: 'all',
    jobType: 'all',
    experience: 'all',
    salaryMin: 0
  },
  dsaFilters: {
    topic: 'all',
    difficulty: 'all',
    status: 'all'
  },
  // Persisted user data
  bookmarkedJobs: new Set(JSON.parse(localStorage.getItem('cf_bookmarks') || '[]')),
  appliedJobs: JSON.parse(localStorage.getItem('cf_applied_jobs') || '[]'),
  solvedDsa: new Set(JSON.parse(localStorage.getItem('cf_dsa_solved') || '[]')),
  starredDsa: new Set(JSON.parse(localStorage.getItem('cf_dsa_starred') || '[]')),
  dsaNotes: JSON.parse(localStorage.getItem('cf_dsa_notes') || '{}'),
  mockTestScores: JSON.parse(localStorage.getItem('cf_mock_scores') || '[]'),
  
  // Custom added jobs
  customJobs: JSON.parse(localStorage.getItem('cf_custom_jobs') || '[]'),

  // Save helpers
  saveBookmarks() {
    localStorage.setItem('cf_bookmarks', JSON.stringify([...this.bookmarkedJobs]));
  },
  saveApplied() {
    localStorage.setItem('cf_applied_jobs', JSON.stringify(this.appliedJobs));
  },
  saveDsaSolved() {
    localStorage.setItem('cf_dsa_solved', JSON.stringify([...this.solvedDsa]));
  },
  saveDsaStarred() {
    localStorage.setItem('cf_dsa_starred', JSON.stringify([...this.starredDsa]));
  },
  saveDsaNotes() {
    localStorage.setItem('cf_dsa_notes', JSON.stringify(this.dsaNotes));
  },
  saveMockScore(score) {
    this.mockTestScores.unshift(score);
    localStorage.setItem('cf_mock_scores', JSON.stringify(this.mockTestScores));
  },
  saveCustomJob(job) {
    this.customJobs.unshift(job);
    localStorage.setItem('cf_custom_jobs', JSON.stringify(this.customJobs));
  }
};

// UI Controller
const App = {
  init() {
    this.bindEvents();
    this.updateHeaderBadges();
    this.render();
  },

  // Get combined jobs list
  getAllJobs() {
    const baseJobs = (window.JobPortalData && window.JobPortalData.jobs) || [];
    return [...AppState.customJobs, ...baseJobs];
  },

  // Navigation & Tab Switching
  switchTab(tabId) {
    AppState.activeTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(el => {
      if (el.dataset.tab === tabId) {
        el.classList.add('active', 'text-indigo-400');
        el.classList.remove('text-slate-400');
      } else {
        el.classList.remove('active', 'text-indigo-400');
        el.classList.add('text-slate-400');
      }
    });

    // Toggle Tab Views
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.add('hidden');
    });
    const target = document.getElementById(`view-${tabId}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('animate-fade-in');
    }

    // Refresh view content
    this.renderView(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  render() {
    this.switchTab(AppState.activeTab);
  },

  renderView(tabId) {
    switch (tabId) {
      case 'jobs':
        this.renderJobs();
        break;
      case 'dsa':
        this.renderDsaSheet();
        break;
      case 'prep':
        this.renderPrepHub();
        break;
      case 'companies':
        this.renderCompanies();
        break;
      case 'mock-test':
        this.renderMockTestHome();
        break;
      case 'ats':
        this.renderAtsChecker();
        break;
      case 'dashboard':
        this.renderDashboard();
        break;
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  },

  // ----------------------------------------------------------------
  // 1. JOB PORTAL MODULE
  // ----------------------------------------------------------------
  renderJobs() {
    const container = document.getElementById('jobs-list-container');
    if (!container) return;

    const allJobs = this.getAllJobs();
    const filtered = allJobs.filter(job => {
      // Search keyword filter
      const q = AppState.searchQuery.toLowerCase();
      const matchesSearch = !q || 
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q));

      // Category filter
      const matchesCategory = AppState.filters.category === 'all' || job.category === AppState.filters.category;

      // Job Type filter
      const matchesType = AppState.filters.jobType === 'all' || job.type === AppState.filters.jobType;

      // Experience filter
      const matchesExp = AppState.filters.experience === 'all' || job.experience.toLowerCase().includes(AppState.filters.experience.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesExp;
    });

    const countElem = document.getElementById('jobs-count-text');
    if (countElem) {
      countElem.textContent = `Showing ${filtered.length} tech openings`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="glass-panel p-12 text-center rounded-2xl">
          <i data-lucide="search-x" class="w-16 h-16 text-slate-500 mx-auto mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">No matching jobs found</h3>
          <p class="text-slate-400 mb-6">Try adjusting your filters or search keywords.</p>
          <button onclick="App.resetJobFilters()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition">
            Reset All Filters
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(job => {
      const isBookmarked = AppState.bookmarkedJobs.has(job.id);
      const isApplied = AppState.appliedJobs.some(a => a.jobId === job.id);

      return `
        <div class="glass-card p-6 rounded-2xl flex flex-col justify-between relative group">
          <div>
            <!-- Top row: Company, Location, Bookmark -->
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl ${job.logoBg || 'bg-indigo-600'} flex items-center justify-center text-white font-bold text-lg shadow-md">
                  ${job.logo}
                </div>
                <div>
                  <h4 class="font-bold text-white text-base group-hover:text-indigo-400 transition flex items-center gap-1.5">
                    ${job.company}
                    <i data-lucide="badge-check" class="w-4 h-4 text-sky-400 inline"></i>
                  </h4>
                  <p class="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${job.location} • <span class="text-indigo-300 font-medium">${job.workplace}</span>
                  </p>
                </div>
              </div>
              <button onclick="App.toggleBookmark('${job.id}')" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Job'}"
                class="p-2.5 rounded-xl border border-slate-700 hover:border-slate-500 transition ${isBookmarked ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'text-slate-400 hover:text-white'}">
                <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}"></i>
              </button>
            </div>

            <!-- Role Title & Salary -->
            <h3 class="text-lg font-bold text-slate-100 mb-2 leading-snug cursor-pointer" onclick="App.viewJobDetails('${job.id}')">
              ${job.title}
            </h3>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                <i data-lucide="banknote" class="w-4 h-4"></i> ${job.salary}
              </span>
              <span class="text-xs text-slate-500">• ${job.experience}</span>
            </div>

            <p class="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
              ${job.description}
            </p>

            <!-- Skills Pills -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${job.skills.slice(0, 4).map(skill => `
                <span class="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60 font-medium">
                  ${skill}
                </span>
              `).join('')}
              ${job.skills.length > 4 ? `
                <span class="px-2 py-1 text-xs rounded-lg bg-slate-800/50 text-slate-400 border border-slate-800">
                  +${job.skills.length - 4} more
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Card Actions -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <span class="text-xs text-slate-500 flex items-center gap-1">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${job.posted}
            </span>
            <div class="flex items-center gap-2">
              <button onclick="App.viewJobDetails('${job.id}')"
                class="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition">
                Details
              </button>
              ${isApplied ? `
                <button class="px-4 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center gap-1 cursor-default">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i> Applied
                </button>
              ` : `
                <button onclick="App.openApplyModal('${job.id}')"
                  class="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-md shadow-indigo-600/20">
                  Easy Apply
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  resetJobFilters() {
    AppState.searchQuery = '';
    AppState.filters = { category: 'all', jobType: 'all', experience: 'all', salaryMin: 0 };
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) searchInput.value = '';
    const catSelect = document.getElementById('filter-category');
    if (catSelect) catSelect.value = 'all';
    const expSelect = document.getElementById('filter-experience');
    if (expSelect) expSelect.value = 'all';
    const typeSelect = document.getElementById('filter-type');
    if (typeSelect) typeSelect.value = 'all';
    this.renderJobs();
  },

  toggleBookmark(jobId) {
    if (AppState.bookmarkedJobs.has(jobId)) {
      AppState.bookmarkedJobs.delete(jobId);
      this.toast('Job removed from saved list', 'info');
    } else {
      AppState.bookmarkedJobs.add(jobId);
      this.toast('Job saved to your bookmarks!', 'success');
    }
    AppState.saveBookmarks();
    this.updateHeaderBadges();
    this.renderJobs();
  },

  viewJobDetails(jobId) {
    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const modalContent = document.getElementById('generic-modal-content');
    const isApplied = AppState.appliedJobs.some(a => a.jobId === job.id);

    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl ${job.logoBg || 'bg-indigo-600'} flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
              ${job.logo}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white mb-1">${job.title}</h2>
              <p class="text-slate-300 font-medium">${job.company} • <span class="text-slate-400 font-normal">${job.location} (${job.workplace})</span></p>
            </div>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 mb-6">
          <div>
            <span class="text-xs text-slate-400 block">Package (CTC)</span>
            <span class="text-sm font-bold text-emerald-400">${job.salary}</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 block">Experience</span>
            <span class="text-sm font-bold text-slate-200">${job.experience}</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 block">Job Type</span>
            <span class="text-sm font-bold text-slate-200">${job.type}</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 block">Posted</span>
            <span class="text-sm font-bold text-slate-200">${job.posted}</span>
          </div>
        </div>

        <div class="space-y-6 text-slate-300 text-sm">
          <div>
            <h4 class="text-base font-bold text-white mb-2">About the Opportunity</h4>
            <p class="leading-relaxed text-slate-300">${job.description}</p>
          </div>

          <div>
            <h4 class="text-base font-bold text-white mb-2">Key Responsibilities</h4>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-300">
              ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-base font-bold text-white mb-2">Requirements & Qualifications</h4>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-300">
              ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-base font-bold text-white mb-2">Required Skills</h4>
            <div class="flex flex-wrap gap-2">
              ${job.skills.map(s => `
                <span class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-700/40">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>

          ${job.benefits ? `
            <div>
              <h4 class="text-base font-bold text-white mb-2">Perks & Benefits</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${job.benefits.map(b => `
                  <div class="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs">
                    <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i> ${b}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <button onclick="App.toggleBookmark('${job.id}'); App.closeGenericModal();" class="text-slate-400 hover:text-white text-sm flex items-center gap-1.5 font-medium">
            <i data-lucide="bookmark" class="w-4 h-4"></i> Save for Later
          </button>
          ${isApplied ? `
            <span class="px-6 py-2.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold rounded-xl flex items-center gap-2">
              <i data-lucide="check-circle" class="w-5 h-5"></i> You've Already Applied
            </span>
          ` : `
            <button onclick="App.closeGenericModal(); App.openApplyModal('${job.id}');" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2">
              Apply Now <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          `}
        </div>
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  openApplyModal(jobId) {
    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const modalContent = document.getElementById('generic-modal-content');
    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-white">Apply to ${job.company}</h2>
            <p class="text-slate-400 text-sm mt-0.5">${job.title} • ${job.location}</p>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <form id="job-apply-form" onsubmit="App.handleJobSubmit(event, '${job.id}')" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
            <input type="text" required id="applicant-name" placeholder="e.g. Rahul Sharma"
              class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
              <input type="email" required id="applicant-email" placeholder="rahul@example.com"
                class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
              <input type="tel" required id="applicant-phone" placeholder="+91 98765 43210"
                class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile</label>
              <input type="url" id="applicant-linkedin" placeholder="https://linkedin.com/in/username"
                class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">GitHub / Portfolio</label>
              <input type="url" id="applicant-portfolio" placeholder="https://github.com/username"
                class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Resume / CV Attachment (Simulated)</label>
            <div class="border-2 border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-indigo-500 transition cursor-pointer bg-slate-900/50">
              <i data-lucide="file-up" class="w-8 h-8 text-indigo-400 mx-auto mb-2"></i>
              <p class="text-xs text-slate-300 font-medium">Click to attach resume or drag PDF / DOCX here</p>
              <p class="text-[11px] text-slate-500 mt-1">PDF up to 5MB (Sample: Rahul_Resume_2026.pdf)</p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Brief Cover Note / Pitch (Optional)</label>
            <textarea id="applicant-note" rows="3" placeholder="Why are you a great match for this role?"
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"></textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button type="button" onclick="App.closeGenericModal()" class="px-5 py-2.5 text-slate-400 hover:text-white text-sm font-semibold">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2">
              <i data-lucide="send" class="w-4 h-4"></i> Submit Application
            </button>
          </div>
        </form>
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  handleJobSubmit(event, jobId) {
    event.preventDefault();
    const job = this.getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const name = document.getElementById('applicant-name').value;
    const email = document.getElementById('applicant-email').value;

    AppState.appliedJobs.push({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      applicantName: name,
      applicantEmail: email,
      status: 'Application Submitted'
    });

    AppState.saveApplied();
    this.closeGenericModal();
    this.updateHeaderBadges();
    this.renderJobs();
    this.toast(`Application sent to ${job.company} successfully!`, 'success');
  },

  openPostJobModal() {
    const modalContent = document.getElementById('generic-modal-content');
    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-white">Post a Job Opening</h2>
            <p class="text-slate-400 text-sm mt-0.5">Reach top student talent and engineering graduates</p>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <form id="post-job-form" onsubmit="App.handleCreateJob(event)" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Company Name *</label>
              <input type="text" required id="post-company" placeholder="e.g. Uber / Atlassian"
                class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
              <input type="text" required id="post-title" placeholder="e.g. Backend Developer"
                class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Location *</label>
              <input type="text" required id="post-location" placeholder="e.g. Bangalore / Remote"
                class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
              <select id="post-category" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                <option value="Software Engineering">Software Engineering</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Data & AI">Data & AI</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Job Type *</label>
              <select id="post-type" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Salary Range / CTC *</label>
              <input type="text" required id="post-salary" placeholder="e.g. ₹14,00,000 - ₹20,00,000 PA"
                class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Required Skills (comma separated) *</label>
              <input type="text" required id="post-skills" placeholder="Java, Spring Boot, AWS, SQL"
                class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Job Description *</label>
            <textarea id="post-desc" required rows="3" placeholder="Brief overview of the role and what the candidate will be building..."
              class="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"></textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button type="button" onclick="App.closeGenericModal()" class="px-5 py-2.5 text-slate-400 hover:text-white text-sm font-semibold">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition">
              Publish Job Listing
            </button>
          </div>
        </form>
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  handleCreateJob(event) {
    event.preventDefault();
    const company = document.getElementById('post-company').value;
    const title = document.getElementById('post-title').value;
    const location = document.getElementById('post-location').value;
    const category = document.getElementById('post-category').value;
    const type = document.getElementById('post-type').value;
    const salary = document.getElementById('post-salary').value;
    const skills = document.getElementById('post-skills').value.split(',').map(s => s.trim()).filter(Boolean);
    const desc = document.getElementById('post-desc').value;

    const newJob = {
      id: `custom-job-${Date.now()}`,
      title,
      company,
      logo: company.slice(0, 2).toUpperCase(),
      logoBg: 'bg-emerald-600',
      location,
      type,
      workplace: location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid',
      experience: '0-2 Years',
      category,
      salary,
      posted: 'Just now',
      skills,
      description: desc,
      responsibilities: ["Develop and maintain scalable production code.", "Collaborate with cross-functional engineering teams."],
      requirements: ["Strong command of Data Structures and CS fundamentals.", "Hands-on experience with listed skills."]
    };

    AppState.saveCustomJob(newJob);
    this.closeGenericModal();
    this.renderJobs();
    this.toast('Your job opening has been published live!', 'success');
  },

  viewAppliedJobs() {
    const modalContent = document.getElementById('generic-modal-content');
    const applied = AppState.appliedJobs;

    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-white flex items-center gap-2">
              <i data-lucide="briefcase" class="w-6 h-6 text-indigo-400"></i> My Job Applications (${applied.length})
            </h2>
            <p class="text-slate-400 text-sm mt-0.5">Track the status of all your submitted applications</p>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        ${applied.length === 0 ? `
          <div class="p-12 text-center">
            <i data-lucide="file-text" class="w-12 h-12 text-slate-600 mx-auto mb-3"></i>
            <h4 class="text-lg font-semibold text-white mb-1">No applications yet</h4>
            <p class="text-slate-400 text-sm mb-4">Browse our curated jobs and apply with one click.</p>
            <button onclick="App.closeGenericModal(); App.switchTab('jobs');" class="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
              Browse Jobs
            </button>
          </div>
        ` : `
          <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            ${applied.map((app, idx) => `
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 class="font-bold text-white text-base">${app.jobTitle}</h4>
                  <p class="text-slate-400 text-xs mt-0.5">${app.company} • Applied on ${app.appliedAt}</p>
                  <p class="text-[11px] text-slate-500 mt-1">Applicant: ${app.applicantName} (${app.applicantEmail})</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ${app.status}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  // ----------------------------------------------------------------
  // 2. DEDICATED DSA SHEET MODULE
  // ----------------------------------------------------------------
  renderDsaSheet() {
    const listContainer = document.getElementById('dsa-problems-list');
    if (!listContainer) return;

    const sheet = (window.JobPortalData && window.JobPortalData.dsaSheet) || [];
    
    // Calculate Stats
    const totalProblems = sheet.length;
    const solvedCount = sheet.filter(p => AppState.solvedDsa.has(p.id)).length;
    const solvedPct = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    const easyProblems = sheet.filter(p => p.difficulty === 'Easy');
    const easySolved = easyProblems.filter(p => AppState.solvedDsa.has(p.id)).length;

    const medProblems = sheet.filter(p => p.difficulty === 'Medium');
    const medSolved = medProblems.filter(p => AppState.solvedDsa.has(p.id)).length;

    const hardProblems = sheet.filter(p => p.difficulty === 'Hard');
    const hardSolved = hardProblems.filter(p => AppState.solvedDsa.has(p.id)).length;

    // Update Progress UI Cards
    const totalBar = document.getElementById('dsa-total-bar');
    const totalText = document.getElementById('dsa-total-text');
    const easyText = document.getElementById('dsa-easy-stat');
    const medText = document.getElementById('dsa-med-stat');
    const hardText = document.getElementById('dsa-hard-stat');

    if (totalBar) totalBar.style.width = `${solvedPct}%`;
    if (totalText) totalText.textContent = `${solvedCount} / ${totalProblems} (${solvedPct}%)`;
    if (easyText) easyText.textContent = `${easySolved} / ${easyProblems.length}`;
    if (medText) medText.textContent = `${medSolved} / ${medProblems.length}`;
    if (hardText) hardText.textContent = `${hardSolved} / ${hardProblems.length}`;

    // Filter problems
    const filtered = sheet.filter(p => {
      const q = (AppState.dsaSearchQuery || '').toLowerCase();
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q) || p.companies.some(c => c.toLowerCase().includes(q));
      const matchesTopic = AppState.dsaFilters.topic === 'all' || p.topic === AppState.dsaFilters.topic;
      const matchesDiff = AppState.dsaFilters.difficulty === 'all' || p.difficulty === AppState.dsaFilters.difficulty;

      let matchesStatus = true;
      if (AppState.dsaFilters.status === 'solved') matchesStatus = AppState.solvedDsa.has(p.id);
      if (AppState.dsaFilters.status === 'unsolved') matchesStatus = !AppState.solvedDsa.has(p.id);
      if (AppState.dsaFilters.status === 'starred') matchesStatus = AppState.starredDsa.has(p.id);

      return matchesSearch && matchesTopic && matchesDiff && matchesStatus;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="glass-panel p-12 text-center rounded-2xl">
          <i data-lucide="layers" class="w-12 h-12 text-slate-500 mx-auto mb-3"></i>
          <h4 class="text-lg font-bold text-white mb-1">No DSA problems match this filter</h4>
          <p class="text-slate-400 text-sm">Try resetting filters to view all sheet problems.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    // Group by Topic
    const grouped = {};
    filtered.forEach(p => {
      if (!grouped[p.topic]) grouped[p.topic] = [];
      grouped[p.topic].push(p);
    });

    listContainer.innerHTML = Object.entries(grouped).map(([topic, problems]) => {
      const topicSolved = problems.filter(p => AppState.solvedDsa.has(p.id)).length;
      const topicPct = Math.round((topicSolved / problems.length) * 100);

      return `
        <div class="glass-panel rounded-2xl overflow-hidden border border-slate-800 mb-6">
          <div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="w-3 h-3 rounded-full bg-indigo-500"></span>
              <h3 class="text-base font-bold text-white">${topic}</h3>
              <span class="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700/60 font-mono">
                ${topicSolved}/${problems.length} Solved
              </span>
            </div>
            <div class="w-32 bg-slate-800 rounded-full h-2 hidden sm:block overflow-hidden">
              <div class="bg-indigo-500 h-2 rounded-full" style="width: ${topicPct}%"></div>
            </div>
          </div>

          <div class="divide-y divide-slate-800/60">
            ${problems.map(p => {
              const isSolved = AppState.solvedDsa.has(p.id);
              const isStarred = AppState.starredDsa.has(p.id);
              const hasNotes = !!AppState.dsaNotes[p.id];
              const diffClass = p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';

              return `
                <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition ${isSolved ? 'bg-slate-900/40' : ''}">
                  <div class="flex items-start md:items-center gap-3.5">
                    <input type="checkbox" ${isSolved ? 'checked' : ''} onchange="App.toggleDsaSolved('${p.id}')"
                      class="w-5 h-5 mt-0.5 md:mt-0 rounded cursor-pointer text-indigo-600 focus:ring-0">
                    <div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <a href="${p.link}" target="_blank" class="font-semibold text-sm ${isSolved ? 'line-through text-slate-400' : 'text-slate-100'} hover:text-indigo-400 transition flex items-center gap-1.5">
                          ${p.title}
                          <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-500"></i>
                        </a>
                        <span class="px-2 py-0.5 text-[11px] font-semibold rounded-md ${diffClass}">
                          ${p.difficulty}
                        </span>
                        ${hasNotes ? `
                          <span class="px-1.5 py-0.5 text-[10px] bg-indigo-950 text-indigo-300 rounded border border-indigo-800 flex items-center gap-0.5">
                            <i data-lucide="file-text" class="w-3 h-3"></i> Note
                          </span>
                        ` : ''}
                      </div>

                      <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span class="text-[11px] text-slate-500 font-medium">Frequently Asked in:</span>
                        ${p.companies.slice(0, 3).map(c => `
                          <span class="text-[11px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                            ${c}
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 self-end md:self-auto">
                    <button onclick="App.toggleDsaStarred('${p.id}')" title="Mark for Revision"
                      class="p-2 rounded-lg border border-slate-700/80 hover:border-slate-500 transition ${isStarred ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-slate-400 hover:text-white'}">
                      <i data-lucide="star" class="w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}"></i>
                    </button>
                    <button onclick="App.openDsaNotesModal('${p.id}')" title="Personal Notes"
                      class="p-2 rounded-lg border border-slate-700/80 hover:border-slate-500 text-slate-400 hover:text-white transition">
                      <i data-lucide="edit-3" class="w-4 h-4"></i>
                    </button>
                    <button onclick="App.viewDsaSolution('${p.id}')"
                      class="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5">
                      <i data-lucide="code-2" class="w-3.5 h-3.5"></i> Solution
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  toggleDsaSolved(probId) {
    if (AppState.solvedDsa.has(probId)) {
      AppState.solvedDsa.delete(probId);
    } else {
      AppState.solvedDsa.add(probId);
      this.toast('Problem marked as Solved! 🎉', 'success');
    }
    AppState.saveDsaSolved();
    this.renderDsaSheet();
  },

  toggleDsaStarred(probId) {
    if (AppState.starredDsa.has(probId)) {
      AppState.starredDsa.delete(probId);
    } else {
      AppState.starredDsa.add(probId);
      this.toast('Saved to revision list!', 'info');
    }
    AppState.saveDsaStarred();
    this.renderDsaSheet();
  },

  viewDsaSolution(probId) {
    const sheet = (window.JobPortalData && window.JobPortalData.dsaSheet) || [];
    const prob = sheet.find(p => p.id === probId);
    if (!prob) return;

    const modalContent = document.getElementById('generic-modal-content');
    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 text-xs font-semibold rounded ${prob.difficulty === 'Easy' ? 'badge-easy' : prob.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">
                ${prob.difficulty}
              </span>
              <span class="text-xs text-slate-400">${prob.topic}</span>
            </div>
            <h2 class="text-2xl font-bold text-white flex items-center gap-2">
              ${prob.title}
              <a href="${prob.link}" target="_blank" class="text-slate-400 hover:text-indigo-400">
                <i data-lucide="external-link" class="w-5 h-5"></i>
              </a>
            </h2>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <div class="space-y-5">
          <!-- Intuition & Complexity -->
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h4 class="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1.5">Optimal Intuition & Approach</h4>
            <p class="text-sm text-slate-300 leading-relaxed">${prob.intuition}</p>
            <div class="flex items-center gap-6 mt-3 pt-3 border-t border-slate-800 text-xs">
              <span class="text-slate-400">Time Complexity: <strong class="text-emerald-400 font-mono">${prob.timeComplexity}</strong></span>
              <span class="text-slate-400">Space Complexity: <strong class="text-sky-400 font-mono">${prob.spaceComplexity}</strong></span>
            </div>
          </div>

          <!-- Code Language Tabs -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <button onclick="App.switchCodeLang('cpp')" id="tab-code-cpp" class="code-lang-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 text-white">C++</button>
                <button onclick="App.switchCodeLang('java')" id="tab-code-java" class="code-lang-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-400">Java</button>
                <button onclick="App.switchCodeLang('python')" id="tab-code-python" class="code-lang-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-400">Python 3</button>
              </div>
              <button onclick="App.copyActiveCode()" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Code
              </button>
            </div>

            <!-- Code Blocks -->
            <div class="code-container p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto max-h-80">
              <pre id="code-snippet-cpp" class="block"><code>${this.escapeHtml(prob.codeCpp)}</code></pre>
              <pre id="code-snippet-java" class="hidden"><code>${this.escapeHtml(prob.codeJava)}</code></pre>
              <pre id="code-snippet-python" class="hidden"><code>${this.escapeHtml(prob.codePython)}</code></pre>
            </div>
          </div>
        </div>
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  switchCodeLang(lang) {
    document.querySelectorAll('.code-lang-btn').forEach(btn => {
      btn.classList.remove('bg-indigo-600', 'text-white');
      btn.classList.add('bg-slate-800', 'text-slate-400');
    });
    const activeBtn = document.getElementById(`tab-code-${lang}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-indigo-600', 'text-white');
      activeBtn.classList.remove('bg-slate-800', 'text-slate-400');
    }

    ['cpp', 'java', 'python'].forEach(l => {
      const el = document.getElementById(`code-snippet-${l}`);
      if (el) el.classList.toggle('hidden', l !== lang);
    });
  },

  copyActiveCode() {
    let activeCode = '';
    ['cpp', 'java', 'python'].forEach(l => {
      const el = document.getElementById(`code-snippet-${l}`);
      if (el && !el.classList.contains('hidden')) {
        activeCode = el.innerText;
      }
    });
    if (activeCode) {
      navigator.clipboard.writeText(activeCode);
      this.toast('Code snippet copied to clipboard!', 'success');
    }
  },

  openDsaNotesModal(probId) {
    const sheet = (window.JobPortalData && window.JobPortalData.dsaSheet) || [];
    const prob = sheet.find(p => p.id === probId);
    if (!prob) return;

    const currentNote = AppState.dsaNotes[probId] || '';

    const modalContent = document.getElementById('generic-modal-content');
    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 class="text-xl font-bold text-white">Personal Revision Notes</h2>
            <p class="text-slate-400 text-xs mt-0.5">${prob.title} (${prob.topic})</p>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <div class="space-y-4">
          <textarea id="prob-note-input" rows="6" placeholder="Write key takeaways, edge cases, formulas, or pitfalls to remember..."
            class="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500">${currentNote}</textarea>

          <div class="flex items-center justify-between">
            <button onclick="App.deleteDsaNote('${probId}')" class="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear Note
            </button>
            <div class="flex items-center gap-2">
              <button onclick="App.closeGenericModal()" class="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
                Cancel
              </button>
              <button onclick="App.saveDsaNote('${probId}')" class="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  saveDsaNote(probId) {
    const val = document.getElementById('prob-note-input').value.trim();
    if (val) {
      AppState.dsaNotes[probId] = val;
    } else {
      delete AppState.dsaNotes[probId];
    }
    AppState.saveDsaNotes();
    this.closeGenericModal();
    this.renderDsaSheet();
    this.toast('Personal note saved!', 'success');
  },

  deleteDsaNote(probId) {
    delete AppState.dsaNotes[probId];
    AppState.saveDsaNotes();
    this.closeGenericModal();
    this.renderDsaSheet();
    this.toast('Note removed', 'info');
  },

  // ----------------------------------------------------------------
  // 3. PREPARATION HUB (APTITUDE, TECHNICAL CORE CS, HR INTERVIEW)
  // ----------------------------------------------------------------
  renderPrepHub() {
    const sub = AppState.subTabs.prep;
    
    // Highlight Sub-nav buttons
    document.querySelectorAll('.prep-nav-btn').forEach(btn => {
      if (btn.dataset.prepSub === sub) {
        btn.classList.add('bg-indigo-600', 'text-white');
        btn.classList.remove('bg-slate-800', 'text-slate-400');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-400');
      }
    });

    ['aptitude', 'technical', 'hr'].forEach(s => {
      const section = document.getElementById(`prep-section-${s}`);
      if (section) section.classList.toggle('hidden', s !== sub);
    });

    if (sub === 'aptitude') this.renderAptitudeSection();
    if (sub === 'technical') this.renderTechnicalSection();
    if (sub === 'hr') this.renderHrSection();

    if (window.lucide) lucide.createIcons();
  },

  switchPrepSubTab(subId) {
    AppState.subTabs.prep = subId;
    this.renderPrepHub();
  },

  // Aptitude
  renderAptitudeSection() {
    const container = document.getElementById('aptitude-content-container');
    if (!container) return;

    const data = window.JobPortalData.aptitude;
    const isNotes = AppState.subTabs.aptitudeSub === 'notes';

    if (isNotes) {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <i data-lucide="file-text" class="w-5 h-5 text-indigo-400"></i> High-Yield Placement Notes & Formulas
            </h3>
            <button onclick="App.toggleAptitudeView('quiz')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition">
              <i data-lucide="play" class="w-3.5 h-3.5"></i> Practice Questions (${data.questions.length})
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${data.notes.quant.map(n => `
              <div class="glass-card p-6 rounded-2xl border border-slate-800">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Quantitative Aptitude</span>
                <h4 class="text-lg font-bold text-white mt-1 mb-2">${n.title}</h4>
                <p class="text-xs text-slate-400 mb-4">${n.summary}</p>
                <div class="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 font-mono">
                  ${this.formatMarkdownText(n.content)}
                </div>
              </div>
            `).join('')}

            ${data.notes.logical.map(n => `
              <div class="glass-card p-6 rounded-2xl border border-slate-800">
                <span class="text-xs font-bold text-sky-400 uppercase tracking-wider">Logical Reasoning</span>
                <h4 class="text-lg font-bold text-white mt-1 mb-2">${n.title}</h4>
                <p class="text-xs text-slate-400 mb-4">${n.summary}</p>
                <div class="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 font-mono">
                  ${this.formatMarkdownText(n.content)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Quiz Engine
      container.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <i data-lucide="check-square" class="w-5 h-5 text-emerald-400"></i> Interactive Aptitude Practice MCQs
              </h3>
              <p class="text-xs text-slate-400 mt-1">Instant evaluation with detailed mathematical step-by-step explanations.</p>
            </div>
            <button onclick="App.toggleAptitudeView('notes')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition">
              <i data-lucide="book" class="w-3.5 h-3.5"></i> View Notes & Formulas
            </button>
          </div>

          <div class="space-y-4">
            ${data.questions.map((q, idx) => `
              <div class="glass-card p-6 rounded-2xl border border-slate-800" id="quiz-card-${q.id}">
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">Question ${idx + 1} • ${q.topic}</span>
                  <span class="px-2 py-0.5 text-[11px] font-semibold rounded ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">
                    ${q.difficulty}
                  </span>
                </div>
                <h4 class="text-base font-semibold text-white mb-4 leading-relaxed">${q.question}</h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  ${q.options.map((opt, optIdx) => `
                    <button onclick="App.checkQuizAnswer('${q.id}', ${optIdx}, ${q.answer})"
                      class="quiz-opt-btn-${q.id} p-3 rounded-xl border border-slate-700 text-left text-xs font-medium text-slate-300 hover:border-indigo-500 hover:bg-slate-800/80 transition flex items-center gap-2">
                      <span class="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-xs">${String.fromCharCode(65 + optIdx)}</span>
                      ${opt}
                    </button>
                  `).join('')}
                </div>

                <div id="quiz-explanation-${q.id}" class="hidden p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p class="font-bold text-white flex items-center gap-1.5 mb-1">
                    <i data-lucide="info" class="w-4 h-4 text-indigo-400"></i> Explanation:
                  </p>
                  <p class="leading-relaxed">${q.explanation}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  },

  toggleAptitudeView(view) {
    AppState.subTabs.aptitudeSub = view;
    this.renderAptitudeSection();
  },

  checkQuizAnswer(qId, selectedIdx, correctIdx) {
    const buttons = document.querySelectorAll(`.quiz-opt-btn-${qId}`);
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIdx) {
        btn.classList.add('bg-emerald-950/80', 'border-emerald-500', 'text-emerald-300');
        btn.classList.remove('border-slate-700');
      } else if (idx === selectedIdx) {
        btn.classList.add('bg-rose-950/80', 'border-rose-500', 'text-rose-300');
        btn.classList.remove('border-slate-700');
      }
    });

    const exp = document.getElementById(`quiz-explanation-${qId}`);
    if (exp) {
      exp.classList.remove('hidden');
      exp.classList.add('animate-fade-in');
    }
  },

  // Technical Core CS
  renderTechnicalSection() {
    const container = document.getElementById('technical-content-container');
    if (!container) return;

    const data = window.JobPortalData.technical;
    const activeSubj = AppState.subTabs.techSubject || 'os';

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Subject Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2">
          ${data.subjects.map(s => `
            <button onclick="App.switchTechSubject('${s.id}')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${s.id === activeSubj ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-400 hover:text-white'}">
              <i data-lucide="${s.icon}" class="w-4 h-4"></i> ${s.name}
            </button>
          `).join('')}
        </div>

        <!-- Subject Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Notes Column -->
          <div class="lg:col-span-2 space-y-6">
            ${(data.notes[activeSubj] || []).map(note => `
              <div class="glass-panel p-6 rounded-2xl border border-slate-800">
                <h3 class="text-lg font-bold text-white mb-1">${note.title}</h3>
                <p class="text-xs text-slate-400 mb-4">${note.summary}</p>
                <div class="text-xs text-slate-300 space-y-3 leading-relaxed bg-slate-900/90 p-5 rounded-xl border border-slate-800/80 font-mono">
                  ${this.formatMarkdownText(note.content)}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Practice MCQs Column -->
          <div class="space-y-4">
            <h4 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="help-circle" class="w-4 h-4 text-indigo-400"></i> ${data.subjects.find(s => s.id === activeSubj)?.name} MCQs
            </h4>
            ${data.questions.filter(q => q.subject === activeSubj).map((q, idx) => `
              <div class="glass-card p-5 rounded-xl border border-slate-800">
                <p class="text-xs font-semibold text-white mb-3">Q${idx + 1}: ${q.question}</p>
                <div class="space-y-2 mb-3">
                  ${q.options.map((opt, optIdx) => `
                    <button onclick="App.checkTechAnswer('${q.id}', ${optIdx}, ${q.answer})"
                      class="tech-opt-btn-${q.id} w-full p-2.5 rounded-lg border border-slate-700/80 text-left text-xs font-medium text-slate-300 hover:bg-slate-800 transition">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div id="tech-explanation-${q.id}" class="hidden p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <span class="font-bold text-emerald-400">Answer:</span> ${q.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  switchTechSubject(subjId) {
    AppState.subTabs.techSubject = subjId;
    this.renderTechnicalSection();
  },

  checkTechAnswer(qId, selectedIdx, correctIdx) {
    const buttons = document.querySelectorAll(`.tech-opt-btn-${qId}`);
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIdx) {
        btn.classList.add('bg-emerald-950/80', 'border-emerald-500', 'text-emerald-300');
      } else if (idx === selectedIdx) {
        btn.classList.add('bg-rose-950/80', 'border-rose-500', 'text-rose-300');
      }
    });

    const exp = document.getElementById(`tech-explanation-${qId}`);
    if (exp) exp.classList.remove('hidden');
  },

  // HR Round
  renderHrSection() {
    const container = document.getElementById('hr-content-container');
    if (!container) return;

    const data = window.JobPortalData.hr;

    container.innerHTML = `
      <div class="space-y-8">
        <!-- STAR Framework Hero Banner -->
        <div class="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/30">
          <div class="max-w-3xl mb-6">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2 inline-block">
              Proven Placement Strategy
            </span>
            <h3 class="text-2xl font-extrabold text-white mb-2">${data.starFramework.title}</h3>
            <p class="text-sm text-slate-300">${data.starFramework.description}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${data.starFramework.steps.map(s => `
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span class="w-8 h-8 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm mb-2 shadow-md">
                  ${s.letter}
                </span>
                <h4 class="font-bold text-white text-sm mb-1">${s.name}</h4>
                <p class="text-xs text-slate-400 leading-relaxed">${s.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Top HR Questions with Sample Winning Answers -->
        <div>
          <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="message-square" class="w-5 h-5 text-indigo-400"></i> Top Behavioral Interview Questions & Model Answers
          </h3>

          <div class="space-y-4">
            ${data.questions.map((q, idx) => `
              <div class="glass-card p-6 rounded-2xl border border-slate-800">
                <div class="flex items-center justify-between gap-4 mb-2">
                  <span class="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">Theme: ${q.category}</span>
                  <span class="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">Framework: ${q.framework}</span>
                </div>

                <h4 class="text-lg font-bold text-white mb-2">Q${idx + 1}: ${q.question}</h4>
                <p class="text-xs text-slate-400 mb-4 italic"><strong class="text-slate-300">What interviewer evaluates:</strong> ${q.objective}</p>

                <div class="space-y-3">
                  <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">Model High-Scoring Response:</span>
                    <p class="text-xs text-slate-300 leading-relaxed font-sans">${q.modelAnswer}</p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div class="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-rose-200">
                      <strong class="font-bold text-rose-400 block mb-1 flex items-center gap-1">
                        <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Common Red Flags & Pitfalls:
                      </strong>
                      <ul class="list-disc pl-4 space-y-0.5">
                        ${q.pitfalls.map(p => `<li>${p}</li>`).join('')}
                      </ul>
                    </div>

                    <div class="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-amber-200">
                      <strong class="font-bold text-amber-400 block mb-1 flex items-center gap-1">
                        <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> Insider Pro Tip:
                      </strong>
                      <p>${q.proTips}</p>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Closing Questions to ask Interviewer -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <i data-lucide="help-circle" class="w-5 h-5 text-indigo-400"></i> Smart Questions Candidates Should Ask the Interviewer
          </h3>
          <p class="text-xs text-slate-400 mb-4">Never say 'I have no questions'. Asking thoughtful questions demonstrates genuine interest and intellectual curiosity.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${data.closingQuestions.map(cq => `
              <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>"${cq}"</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  // ----------------------------------------------------------------
  // 4. COMPANIES HIRING PROCESS MODULE
  // ----------------------------------------------------------------
  renderCompanies() {
    const container = document.getElementById('companies-list-container');
    if (!container) return;

    const companies = (window.JobPortalData && window.JobPortalData.companies) || [];

    container.innerHTML = companies.map(comp => `
      <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-14 h-14 rounded-2xl ${comp.logoBg} flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
              ${comp.logo}
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">${comp.name}</h3>
              <span class="text-xs text-indigo-400 font-medium">${comp.tier}</span>
            </div>
          </div>

          <!-- Package Highlights -->
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 mb-4">
            <span class="text-[11px] text-slate-400 block font-semibold">Compensation Packages</span>
            <span class="text-xs font-bold text-emerald-400 leading-snug">${comp.packageOverview}</span>
          </div>

          <!-- Rounds Snapshot -->
          <div class="space-y-2 mb-5 text-xs text-slate-300">
            <span class="font-bold text-slate-200 block">Selection Stages:</span>
            <ul class="space-y-1.5 pl-2">
              ${comp.examPattern.map((r, i) => `
                <li class="flex items-center gap-2 text-slate-400">
                  <span class="w-4 h-4 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">${i + 1}</span>
                  <span class="truncate">${r.section.split('(')[0]}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <button onclick="App.viewCompanyDetails('${comp.id}')"
          class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20">
          View Complete Exam Pattern & Syllabus <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  viewCompanyDetails(compId) {
    const comp = (window.JobPortalData.companies || []).find(c => c.id === compId);
    if (!comp) return;

    const modalContent = document.getElementById('generic-modal-content');
    modalContent.innerHTML = `
      <div class="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl ${comp.logoBg} flex items-center justify-center text-white font-extrabold text-2xl shadow-xl">
              ${comp.logo}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">${comp.name}</h2>
              <p class="text-indigo-400 text-sm font-semibold">${comp.tier} • ${comp.packageOverview}</p>
            </div>
          </div>
          <button onclick="App.closeGenericModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <!-- Eligibility Box -->
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
          <h4 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Official Eligibility Criteria
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div><span class="text-slate-400">Target Degrees:</span> <strong class="text-slate-200">${comp.eligibility.degree}</strong></div>
            <div><span class="text-slate-400">Cutoff / Percentage:</span> <strong class="text-slate-200">${comp.eligibility.minCgpa}</strong></div>
            <div><span class="text-slate-400">Backlog Allowed:</span> <strong class="text-slate-200">${comp.eligibility.backlogs}</strong></div>
            <div><span class="text-slate-400">Gap Policy:</span> <strong class="text-slate-200">${comp.eligibility.gapPolicy}</strong></div>
          </div>
        </div>

        <!-- Selection Process & Exam Pattern -->
        <div class="mb-6">
          <h4 class="text-base font-bold text-white mb-3 flex items-center gap-2">
            <i data-lucide="layers" class="w-4 h-4 text-indigo-400"></i> Exam Pattern & Selection Stages
          </h4>
          <div class="space-y-3">
            ${comp.examPattern.map((round, idx) => `
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-indigo-300">Round ${idx + 1}: ${round.section}</span>
                  <span class="text-slate-500 font-mono">${round.negativeMarking}</span>
                </div>
                <p class="text-slate-300 leading-relaxed">${round.details}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Detailed Syllabus -->
        <div class="mb-6">
          <h4 class="text-base font-bold text-white mb-3 flex items-center gap-2">
            <i data-lucide="book-open" class="w-4 h-4 text-sky-400"></i> Sectional Syllabus Breakdown
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            ${Object.entries(comp.syllabus).map(([sec, content]) => `
              <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span class="text-slate-400 uppercase font-bold text-[11px] tracking-wider block mb-1">${sec}</span>
                <p class="text-slate-300 leading-relaxed font-sans">${content}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Real Past Questions -->
        <div class="mb-6">
          <h4 class="text-base font-bold text-white mb-3 flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-amber-400"></i> Real Interview Questions Previously Asked
          </h4>
          <div class="space-y-2">
            ${comp.interviewQuestions.map(q => `
              <div class="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <i data-lucide="chevron-right" class="w-4 h-4 text-indigo-400 shrink-0"></i>
                <span>${q}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Prep Strategy -->
        <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/40 text-xs text-indigo-200">
          <strong class="font-bold text-indigo-300 block mb-1">Expert Preparation Strategy:</strong>
          <p>${comp.prepStrategy}</p>
        </div>
      </div>
    `;

    this.openGenericModal();
    if (window.lucide) lucide.createIcons();
  },

  // ----------------------------------------------------------------
  // 5. TIMED MOCK TEST SIMULATOR
  // ----------------------------------------------------------------
  renderMockTestHome() {
    const container = document.getElementById('mock-test-container');
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-3xl mx-auto glass-panel p-8 rounded-2xl border border-slate-800 text-center">
        <div class="w-20 h-20 rounded-3xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <i data-lucide="timer" class="w-10 h-10"></i>
        </div>
        <h2 class="text-3xl font-extrabold text-white mb-3">Campus Placement Mock Assessment</h2>
        <p class="text-slate-400 text-sm max-w-xl mx-auto mb-8">
          Simulate a real online hiring test combining Quantitative Aptitude, Core CS Fundamentals, and Data Structures logic.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left max-w-xl mx-auto text-xs">
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span class="text-slate-400 block">Total Questions</span>
            <span class="text-lg font-bold text-white">10 Questions</span>
          </div>
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span class="text-slate-400 block">Time Duration</span>
            <span class="text-lg font-bold text-indigo-400">15 Minutes</span>
          </div>
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span class="text-slate-400 block">Format</span>
            <span class="text-lg font-bold text-emerald-400">Aptitude + CS</span>
          </div>
        </div>

        <button onclick="App.startMockTest()"
          class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-xl shadow-indigo-600/30 flex items-center gap-2 mx-auto">
          <i data-lucide="play" class="w-5 h-5"></i> Start Test Now
        </button>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  startMockTest() {
    const aptQs = (window.JobPortalData.aptitude.questions || []).slice(0, 5);
    const techQs = (window.JobPortalData.technical.questions || []).slice(0, 5);
    const mockQuestions = [...aptQs, ...techQs];

    let currentIdx = 0;
    const userAnswers = {};
    let timeLeftSeconds = 15 * 60;

    const container = document.getElementById('mock-test-container');
    const timerInterval = setInterval(() => {
      timeLeftSeconds--;
      const min = Math.floor(timeLeftSeconds / 60);
      const sec = timeLeftSeconds % 60;
      const timerElem = document.getElementById('mock-timer-display');
      if (timerElem) {
        timerElem.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      }
      if (timeLeftSeconds <= 0) {
        clearInterval(timerInterval);
        submitTest();
      }
    }, 1000);

    const renderQuestion = () => {
      const q = mockQuestions[currentIdx];
      const selected = userAnswers[currentIdx];

      container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-6">
          <!-- Top bar -->
          <div class="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="font-bold text-white text-sm">Placement Simulation</span>
              <span class="text-xs text-slate-400">Question ${currentIdx + 1} of ${mockQuestions.length}</span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-amber-400"></i>
              <span id="mock-timer-display" class="font-mono font-bold text-amber-400 text-base">15:00</span>
            </div>
          </div>

          <!-- Question Body -->
          <div class="glass-card p-6 md:p-8 rounded-2xl border border-slate-800">
            <div class="mb-4">
              <span class="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">Category: ${q.subject || q.category || 'General'}</span>
              <h3 class="text-lg font-bold text-white mt-2 leading-relaxed">${q.question}</h3>
            </div>

            <div class="space-y-3 mb-6">
              ${q.options.map((opt, i) => `
                <button onclick="window.selectMockOption(${i})"
                  class="w-full p-4 rounded-xl border text-left text-xs font-medium transition flex items-center gap-3 ${selected === i ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200' : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-800'}">
                  <span class="w-6 h-6 rounded-lg ${selected === i ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'} font-bold flex items-center justify-center text-xs">
                    ${String.fromCharCode(65 + i)}
                  </span>
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-slate-800">
              <button ${currentIdx === 0 ? 'disabled' : ''} onclick="window.navMockQuestion(${currentIdx - 1})"
                class="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold">
                Previous
              </button>

              <div class="flex items-center gap-2">
                ${currentIdx === mockQuestions.length - 1 ? `
                  <button onclick="window.submitMockTest()" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-600/30">
                    Submit Test
                  </button>
                ` : `
                  <button onclick="window.navMockQuestion(${currentIdx + 1})" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition">
                    Next Question
                  </button>
                `}
              </div>
            </div>
          </div>

          <!-- Question Palette -->
          <div class="glass-panel p-4 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400 font-semibold block mb-2">Question Navigation Palette</span>
            <div class="flex flex-wrap gap-2">
              ${mockQuestions.map((_, i) => `
                <button onclick="window.navMockQuestion(${i})"
                  class="w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ${i === currentIdx ? 'border-2 border-indigo-500 text-white' : ''} ${userAnswers[i] !== undefined ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}">
                  ${i + 1}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    };

    window.selectMockOption = (idx) => {
      userAnswers[currentIdx] = idx;
      renderQuestion();
    };

    window.navMockQuestion = (idx) => {
      currentIdx = idx;
      renderQuestion();
    };

    const submitTest = () => {
      clearInterval(timerInterval);
      let correct = 0;
      mockQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) correct++;
      });

      const scorePct = Math.round((correct / mockQuestions.length) * 100);
      AppState.saveMockScore({
        date: new Date().toLocaleDateString(),
        score: scorePct,
        correct,
        total: mockQuestions.length
      });

      container.innerHTML = `
        <div class="max-w-2xl mx-auto glass-panel p-8 rounded-2xl border border-slate-800 text-center animate-fade-in">
          <div class="w-16 h-16 rounded-2xl ${scorePct >= 70 ? 'bg-emerald-600/20 text-emerald-400' : 'bg-amber-600/20 text-amber-400'} flex items-center justify-center mx-auto mb-4">
            <i data-lucide="${scorePct >= 70 ? 'award' : 'alert-circle'}" class="w-8 h-8"></i>
          </div>
          <h2 class="text-2xl font-bold text-white mb-1">Assessment Completed!</h2>
          <p class="text-slate-400 text-xs mb-6">Here is your performance summary for this attempt.</p>

          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
            <div class="text-4xl font-extrabold ${scorePct >= 70 ? 'text-emerald-400' : 'text-amber-400'} mb-1 font-mono">
              ${scorePct}%
            </div>
            <p class="text-xs text-slate-400">You scored ${correct} out of ${mockQuestions.length} correct</p>
          </div>

          <div class="flex items-center justify-center gap-3">
            <button onclick="App.renderMockTestHome()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold">
              Retake Mock Test
            </button>
            <button onclick="App.switchTab('dashboard')" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold">
              View on Dashboard
            </button>
          </div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    };

    window.submitMockTest = submitTest;
    renderQuestion();
  },

  // ----------------------------------------------------------------
  // 6. ATS RESUME ANALYZER MODULE
  // ----------------------------------------------------------------
  renderAtsChecker() {
    const container = document.getElementById('ats-content-container');
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="glass-panel p-6 md:p-8 rounded-2xl border border-slate-800">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <i data-lucide="file-check-2" class="w-5 h-5"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">ATS Resume & Keyword Matcher</h2>
              <p class="text-xs text-slate-400">Benchmark your resume text against real automated ATS screening parsers</p>
            </div>
          </div>

          <div class="space-y-4 mt-6">
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1.5">Select Target Job Profile</label>
              <select id="ats-role-select" class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500">
                <option value="sde">Software Development Engineer (SDE / Full Stack)</option>
                <option value="frontend">Frontend Specialist (React / Web UI)</option>
                <option value="backend">Backend & Distributed Systems</option>
                <option value="data">Data Analyst / AI Engineer</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1.5">Paste Resume Text / Skills Summary</label>
              <textarea id="ats-resume-input" rows="7" placeholder="Paste your resume content here (e.g., summary, technical skills, projects, and work experience)..."
                class="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-indigo-500 leading-relaxed"></textarea>
            </div>

            <button onclick="App.runAtsAnalysis()"
              class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30">
              <i data-lucide="scan" class="w-4 h-4"></i> Run ATS Compatibility Scan
            </button>
          </div>
        </div>

        <div id="ats-results-box" class="hidden"></div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  runAtsAnalysis() {
    const text = (document.getElementById('ats-resume-input')?.value || '').toLowerCase();
    const role = document.getElementById('ats-role-select')?.value || 'sde';

    const keywordsMap = {
      sde: ['java', 'python', 'c++', 'data structures', 'algorithms', 'git', 'sql', 'system design', 'rest', 'oop', 'docker', 'ci/cd', 'agile'],
      frontend: ['react', 'javascript', 'typescript', 'html5', 'css3', 'tailwind', 'redux', 'next.js', 'responsive', 'api', 'webpack', 'ui/ux'],
      backend: ['node.js', 'java', 'golang', 'postgresql', 'mongodb', 'redis', 'kafka', 'microservices', 'aws', 'rest api', 'docker', 'concurrency'],
      data: ['python', 'sql', 'pandas', 'numpy', 'machine learning', 'powerbi', 'tableau', 'statistics', 'spark', 'etl', 'tensorflow', 'scikit-learn']
    };

    const targetList = keywordsMap[role] || keywordsMap.sde;
    const matched = targetList.filter(k => text.includes(k));
    const missing = targetList.filter(k => !text.includes(k));

    const score = Math.round((matched.length / targetList.length) * 100);

    const resultsBox = document.getElementById('ats-results-box');
    if (!resultsBox) return;

    resultsBox.classList.remove('hidden');
    resultsBox.innerHTML = `
      <div class="glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 animate-fade-in space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white">ATS Screening Score</h3>
            <p class="text-xs text-slate-400">Based on industry standard keyword presence for this role</p>
          </div>
          <div class="text-3xl font-extrabold ${score >= 70 ? 'text-emerald-400' : 'text-amber-400'} font-mono">
            ${score}%
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
            <h4 class="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <i data-lucide="check-circle" class="w-4 h-4"></i> Matched Keywords (${matched.length})
            </h4>
            <div class="flex flex-wrap gap-1.5">
              ${matched.length ? matched.map(m => `
                <span class="px-2 py-1 rounded bg-emerald-900/50 text-emerald-300 text-[11px] font-mono">${m}</span>
              `).join('') : '<span class="text-xs text-slate-500">None detected</span>'}
            </div>
          </div>

          <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40">
            <h4 class="text-xs font-bold text-rose-400 mb-2 flex items-center gap-1.5">
              <i data-lucide="x-circle" class="w-4 h-4"></i> Missing Recommended Keywords (${missing.length})
            </h4>
            <div class="flex flex-wrap gap-1.5">
              ${missing.length ? missing.map(m => `
                <span class="px-2 py-1 rounded bg-rose-900/50 text-rose-300 text-[11px] font-mono">${m}</span>
              `).join('') : '<span class="text-xs text-emerald-400">All target keywords covered!</span>'}
            </div>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
          <strong class="font-bold text-white block">Actionable Resume Optimization Advice:</strong>
          <ul class="list-disc pl-5 space-y-1 text-slate-400">
            <li>Integrate the missing highlighted keywords naturally in your project descriptions and technical stack sections.</li>
            <li>Use the <strong>XYZ Formula</strong> made famous by Google: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.</li>
            <li>Avoid non-standard complex graphics, tables, or columns that can confuse automated ATS OCR parsers.</li>
          </ul>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  // ----------------------------------------------------------------
  // 7. USER DASHBOARD & READINESS SCORE
  // ----------------------------------------------------------------
  renderDashboard() {
    const container = document.getElementById('dashboard-content-container');
    if (!container) return;

    const sheet = (window.JobPortalData && window.JobPortalData.dsaSheet) || [];
    const dsaSolved = AppState.solvedDsa.size;
    const dsaTotal = sheet.length;
    const dsaPct = dsaTotal ? Math.round((dsaSolved / dsaTotal) * 100) : 0;

    const appliedCount = AppState.appliedJobs.length;
    const bookmarkCount = AppState.bookmarkedJobs.size;

    const latestMock = AppState.mockTestScores[0];
    const mockScore = latestMock ? latestMock.score : 0;

    // Overall Readiness Score Calculation
    // 50% DSA + 30% Mock Test + 20% Job activity
    const readinessScore = Math.min(100, Math.round((dsaPct * 0.5) + (mockScore * 0.3) + (Math.min(appliedCount * 10, 20))));

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Readiness Hero Gauge -->
        <div class="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2 inline-block">
              Placement Readiness Meter
            </span>
            <h2 class="text-2xl font-extrabold text-white mb-2">Overall Candidate Readiness: ${readinessScore}%</h2>
            <p class="text-xs text-slate-400 max-w-xl">
              Calculated dynamically based on your completed DSA problems, mock assessment attempts, and active job portal applications.
            </p>
          </div>
          <div class="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center relative shadow-2xl">
            <div class="text-3xl font-extrabold text-indigo-400 font-mono">${readinessScore}%</div>
          </div>
        </div>

        <!-- 4 Key Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="glass-card p-5 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400 font-medium">DSA Problems Solved</span>
            <div class="text-2xl font-bold text-white mt-1">${dsaSolved} / ${dsaTotal}</div>
            <div class="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div class="bg-indigo-500 h-1.5 rounded-full" style="width: ${dsaPct}%"></div>
            </div>
          </div>

          <div class="glass-card p-5 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400 font-medium">Job Applications</span>
            <div class="text-2xl font-bold text-emerald-400 mt-1">${appliedCount} Applied</div>
            <p class="text-[11px] text-slate-500 mt-2">Active in interview pipelines</p>
          </div>

          <div class="glass-card p-5 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400 font-medium">Saved / Bookmarked Jobs</span>
            <div class="text-2xl font-bold text-amber-400 mt-1">${bookmarkCount} Saved</div>
            <p class="text-[11px] text-slate-500 mt-2">Ready to apply</p>
          </div>

          <div class="glass-card p-5 rounded-xl border border-slate-800">
            <span class="text-xs text-slate-400 font-medium">Latest Mock Test</span>
            <div class="text-2xl font-bold text-sky-400 mt-1">${latestMock ? `${latestMock.score}%` : 'Not Taken'}</div>
            <p class="text-[11px] text-slate-500 mt-2">${latestMock ? `Attempted on ${latestMock.date}` : 'Take your first test'}</p>
          </div>
        </div>

        <!-- Applied & Saved Tabs -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 class="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Applied Jobs (${appliedCount})</span>
              <button onclick="App.switchTab('jobs')" class="text-xs text-indigo-400 hover:text-indigo-300">Browse Jobs &rarr;</button>
            </h3>
            ${appliedCount === 0 ? `
              <p class="text-xs text-slate-500 py-4 text-center">No applications submitted yet.</p>
            ` : `
              <div class="space-y-2">
                ${AppState.appliedJobs.slice(0, 4).map(app => `
                  <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <strong class="text-white block">${app.jobTitle}</strong>
                      <span class="text-slate-400">${app.company} • ${app.appliedAt}</span>
                    </div>
                    <span class="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 text-[11px] font-semibold">${app.status}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div class="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 class="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Starred for Revision (${AppState.starredDsa.size})</span>
              <button onclick="App.switchTab('dsa')" class="text-xs text-indigo-400 hover:text-indigo-300">Open DSA Sheet &rarr;</button>
            </h3>
            ${AppState.starredDsa.size === 0 ? `
              <p class="text-xs text-slate-500 py-4 text-center">No DSA problems starred for revision.</p>
            ` : `
              <div class="space-y-2">
                ${sheet.filter(p => AppState.starredDsa.has(p.id)).slice(0, 4).map(p => `
                  <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <strong class="text-white block">${p.title}</strong>
                      <span class="text-slate-400">${p.topic}</span>
                    </div>
                    <button onclick="App.viewDsaSolution('${p.id}')" class="px-3 py-1 bg-indigo-600/30 text-indigo-300 rounded text-[11px] font-semibold">
                      Solution
                    </button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  // ----------------------------------------------------------------
  // MODALS & HELPERS
  // ----------------------------------------------------------------
  openGenericModal() {
    const modal = document.getElementById('generic-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  },

  closeGenericModal() {
    const modal = document.getElementById('generic-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  updateHeaderBadges() {
    const applyBadge = document.getElementById('header-applied-count');
    if (applyBadge) {
      applyBadge.textContent = AppState.appliedJobs.length;
    }
  },

  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const el = document.createElement('div');
    const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-indigo-600';
    el.className = `toast px-4 py-3 rounded-xl text-white text-xs font-semibold shadow-2xl flex items-center gap-2 ${bg}`;
    el.innerHTML = `<span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 3200);
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  },

  formatMarkdownText(text) {
    if (!text) return '';
    return text
      .replace(/### (.*?)\n/g, '<h4 class="font-bold text-white text-sm mt-2 mb-1">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px]">$1</code>')
      .replace(/\n\n/g, '<br/>');
  },

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.tab);
      });
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeGenericModal();
    });

    // Job Search Input
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;
        this.renderJobs();
      });
    }

    // Job Category Filter
    const catFilter = document.getElementById('filter-category');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        AppState.filters.category = e.target.value;
        this.renderJobs();
      });
    }

    // Job Experience Filter
    const expFilter = document.getElementById('filter-experience');
    if (expFilter) {
      expFilter.addEventListener('change', (e) => {
        AppState.filters.experience = e.target.value;
        this.renderJobs();
      });
    }

    // Job Type Filter
    const typeFilter = document.getElementById('filter-type');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        AppState.filters.jobType = e.target.value;
        this.renderJobs();
      });
    }

    // DSA Topic Filter
    const dsaTopicFilter = document.getElementById('dsa-filter-topic');
    if (dsaTopicFilter) {
      dsaTopicFilter.addEventListener('change', (e) => {
        AppState.dsaFilters.topic = e.target.value;
        this.renderDsaSheet();
      });
    }

    // DSA Difficulty Filter
    const dsaDiffFilter = document.getElementById('dsa-filter-difficulty');
    if (dsaDiffFilter) {
      dsaDiffFilter.addEventListener('change', (e) => {
        AppState.dsaFilters.difficulty = e.target.value;
        this.renderDsaSheet();
      });
    }

    // DSA Status Filter
    const dsaStatusFilter = document.getElementById('dsa-filter-status');
    if (dsaStatusFilter) {
      dsaStatusFilter.addEventListener('change', (e) => {
        AppState.dsaFilters.status = e.target.value;
        this.renderDsaSheet();
      });
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
