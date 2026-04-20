import './style.css'

// Helper to generate project card HTML
function createProjectCard(project, isFeatured = false) {
  const highlightClass = project.highlight ? 'border-primary/40 ring-1 ring-primary/20 bg-slate-900/60' : 'bg-slate-900/40 border-slate-800'
  const compactClass = isFeatured ? 'p-8' : 'p-6 border-slate-800/60 bg-slate-900/30'
  
  return `
    <div class="glass-card flex flex-col group ${highlightClass} ${compactClass} transition-all duration-300 h-full">
      
      <!-- 1. Header Section -->
      <div class="min-h-[100px] mb-8">
        <h3 class="${isFeatured ? 'text-2xl' : 'text-xl'} font-bold group-hover:text-primary transition-colors mb-3">
          ${project.title}
        </h3>
        <div class="flex flex-col space-y-4 font-mono">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-widest block font-mono">${project.role}</span>
          <div class="flex flex-wrap gap-2.5">
            ${project.tags.map(tag => `
              <span class="px-3 py-1.5 bg-slate-800/50 text-[10px] text-slate-400 rounded-md border border-slate-700/50 uppercase font-bold tracking-tight">${tag}</span>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- 2. Content Section -->
      <div class="flex-grow flex flex-col">
        <div class="min-h-[120px] mb-8">
          <p class="text-sm text-slate-200 leading-7 font-medium mb-6">${project.description}</p>
          <p class="text-base text-primary font-bold italic border-l-2 border-primary/30 pl-4">Impact: ${project.impact}</p>
        </div>

        <!-- 3. Engineering Proof Section (The Signal) -->
        <div class="space-y-8 pt-8 border-t border-slate-800/50">
          
          <!-- Architecture Highlights -->
          <div class="space-y-3">
            <span class="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Architecture Highlights</span>
            <ul class="space-y-2.5">
              ${project.architecture_highlights.map(h => `
                <li class="text-[11px] text-slate-300 flex items-start leading-relaxed">
                  <span class="text-primary/60 mr-3 font-bold">→</span>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Engineering Challenge -->
          <div class="p-5 bg-slate-950/20 border-l-2 border-primary/20 space-y-3">
             <span class="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Engineering Challenge</span>
             <p class="text-[11px] text-slate-300 leading-relaxed font-semibold">${project.technical_challenge.problem}</p>
             <p class="text-[11px] text-slate-300 leading-relaxed">
               <span class="text-primary/80 font-bold mr-1 uppercase">Solution:</span> 
               ${project.technical_challenge.mitigation}
             </p>
          </div>

          <!-- Trade-offs -->
          <div class="bg-slate-950/40 p-5 rounded-xl border border-slate-800/50 space-y-3">
            <span class="text-[10px] font-bold text-secondary uppercase tracking-widest block">Design Decisions (Trade-offs)</span>
            <ul class="space-y-3">
              ${project.design_decisions.map(d => `
                <li class="text-[11px] text-slate-300 leading-relaxed border-l-2 border-secondary/20 pl-4 italic">
                  ${d}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- 4. Action Button -->
      <div class="mt-10 pt-8 border-t border-slate-800/50">
        <a 
          href="${project.github_url}" 
          target="_blank"
          class="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-bold rounded-lg border border-slate-700 hover:border-primary/50 transition-all flex items-center justify-center space-x-3 group/btn"
        >
          <span>Explore Code & Architecture</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover/btn:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  `
}

// Helper to generate certification HTML
function createCertCard(cert) {
  return `
    <div class="glass-card p-6 flex flex-col items-center text-center hover:border-primary/30 transition-all h-full">
      <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-primary">
        ${cert.icon === 'aws' ? '☁️' : cert.icon === 'ai' ? '🧠' : '💻'}
      </div>
      <h3 class="font-bold text-sm mb-1">${cert.title}</h3>
      <p class="text-xs text-slate-400 mb-2 truncate w-full">${cert.issuer}</p>
      <span class="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-auto pt-2">${cert.date}</span>
    </div>
  `
}

async function initData() {
  const featuredContainer = document.querySelector('#featured-projects')
  const supportingContainer = document.querySelector('#supporting-projects')
  const certiContainer = document.querySelector('#certifications-grid')
  
  try {
    const pResponse = await fetch('/data/projects.json')
    const projects = await pResponse.json()
    
    const flagship = projects.filter(p => p.priority === 1)
    const supporting = projects.filter(p => p.priority === 2)
    
    featuredContainer.innerHTML = flagship.map(p => createProjectCard(p, true)).join('')
    supportingContainer.innerHTML = supporting.map(p => createProjectCard(p, false)).join('')

    const cResponse = await fetch('/data/certifications.json')
    const certifications = await cResponse.json()
    certiContainer.innerHTML = certifications.map(c => createCertCard(c)).join('')
    
  } catch (err) {
    console.error('Failed to load data:', err)
  }
}

document.addEventListener('DOMContentLoaded', initData)
