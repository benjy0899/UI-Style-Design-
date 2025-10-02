import React, { useState } from 'react';
import type { UIStyle } from '../types';
import { 
  ActivityIcon, 
  CalendarIcon, 
  CircleUserIcon, 
  CreditCardIcon, 
  DollarSignIcon, 
  DownloadIcon, 
  UsersIcon 
} from './Icons';

// ============================================================================
// Tooltip Sub-Component
// ============================================================================
interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group flex justify-center">
      {children}
      <span
        className={`
          absolute bottom-full mb-2 w-max max-w-xs z-10
          invisible group-hover:visible opacity-0 group-hover:opacity-100
          bg-bio-deep/90 backdrop-blur-sm text-bio-teal text-xs rounded-md px-3 py-2
          transition-opacity duration-200 pointer-events-none
          font-secondary border border-bio-teal/30
        `}
      >
        {text}
      </span>
    </div>
  );
};


// ============================================================================
// Main Preview Component
// ============================================================================

interface StylePreviewProps {
  style: UIStyle;
}

const StylePreview: React.FC<StylePreviewProps> = ({ style }) => {
  const [activePreviewPage, setActivePreviewPage] = useState<'dashboard' | 'profile' | 'settings' | 'analytics'>('dashboard');
  const { name, fonts, previewConfig } = style;
  const {
    palette,
    containerClasses,
    cardClasses,
    kpiCardClasses,
    buttonClasses,
    tabClasses,
    avatarClasses
  } = previewConfig;

  const cardBase = cardClasses || 'bg-neutral p-6 rounded-lg';
  const kpiCardBase = kpiCardClasses || cardBase;

  const dynamicStyles = {
    '--font-primary': `"${fonts.primary}", sans-serif`,
    '--font-secondary': `"${fonts.secondary}", sans-serif`,
    backgroundColor: palette.bg, 
    color: palette.text 
  } as React.CSSProperties;

  const previewPages = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ] as const;

  return (
    <section className="mb-8" style={dynamicStyles}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 font-primary tracking-wider" style={{ color: palette.primary }}>
            {name}
          </h2>
          <p className="font-secondary text-sm" style={{ color: palette.text, opacity: 0.8 }}>
            Live Preview • {fonts.primary} + {fonts.secondary}
          </p>
        </div>
        
        {/* Dynamic Preview Page Selector */}
        <div 
          className="flex backdrop-blur-sm rounded-xl p-1 border"
          style={{ 
            backgroundColor: palette.neutral,
            borderColor: palette.primary + '30'
          }}
        >
          {previewPages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePreviewPage(page.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-secondary transition-all duration-300"
              style={{
                backgroundColor: activePreviewPage === page.id ? palette.primary + '20' : 'transparent',
                color: activePreviewPage === page.id ? palette.primary : palette.text,
                borderColor: activePreviewPage === page.id ? palette.primary + '50' : 'transparent'
              }}
            >
              <span>{page.icon}</span>
              {page.label}
            </button>
          ))}
        </div>
      </div>
      
      <style>
        {`
          @keyframes content-enter {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-content-enter {
            animation: content-enter 0.5s ease-out forwards;
            opacity: 0;
          }
          @keyframes draw-line {
            to { stroke-dashoffset: 0; }
          }
          .animate-draw-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw-line 2s 0.8s ease-out forwards;
          }
           @keyframes pulse-dot {
            0%, 100% { r: 4; opacity: 1; }
            50% { r: 8; opacity: 0.5; }
          }
          .animate-pulse-dot {
            animation: pulse-dot 2.5s 1.5s infinite ease-in-out;
          }
        `}
      </style>

      <div
        key={style.id} // Re-triggers animations on style change
        className={`w-full p-4 md:p-8 rounded-xl transition-all duration-500 overflow-hidden ${containerClasses} font-secondary`}
        style={dynamicStyles}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 animate-content-enter" style={{ animationDelay: '100ms' }}>
          <h3 className={`text-2xl font-bold tracking-tight font-primary`}>
            Dashboard
          </h3>
          <div className="flex items-center space-x-2">
            <Tooltip text="Change date range">
              <div className={`${buttonClasses} flex items-center gap-2`}>
                <CalendarIcon className="w-4 h-4" />
                <span>Oct 20, 2023 - Nov 19, 2023</span>
              </div>
            </Tooltip>
             <Tooltip text="Download report">
              <button className={buttonClasses}>
                <DownloadIcon className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Render different pages based on selection */}
        {activePreviewPage === 'dashboard' && (
          <>
            <div className={`${tabClasses?.container || ''} animate-content-enter`} style={{ animationDelay: '200ms' }}>
              <nav className="flex space-x-2" aria-label="Tabs">
                <button className={`${tabClasses?.base} ${tabClasses?.active}`}>Overview</button>
                <button className={`${tabClasses?.base} ${tabClasses?.inactive}`}>Analytics</button>
                <button className={`${tabClasses?.base} ${tabClasses?.inactive}`}>Reports</button>
                <button className={`${tabClasses?.base} ${tabClasses?.inactive}`}>Notifications</button>
              </nav>
            </div>

            <main className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" Icon={DollarSignIcon} styleClass={kpiCardBase} animationDelay={300} tooltipText="Total revenue generated this period." />
                <KpiCard title="Subscriptions" value="+2350" change="+180.1% from last month" Icon={UsersIcon} styleClass={kpiCardBase} animationDelay={400} tooltipText="New subscribers this month." />
                <KpiCard title="Sales" value="+12,234" change="+19% from last month" Icon={CreditCardIcon} styleClass={kpiCardBase} animationDelay={500} tooltipText="Total number of sales." />
                <KpiCard title="Active Now" value="+573" change="+201 since last hour" Icon={ActivityIcon} styleClass={kpiCardBase} animationDelay={600} tooltipText="Users currently active on the platform." />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className={`${cardBase} lg:col-span-4 animate-content-enter transition-transform duration-300 hover:-translate-y-1`} style={{ animationDelay: '700ms' }}>
                  <h4 className="text-lg font-semibold font-primary">Overview</h4>
                  <div className="relative h-72 mt-4 rounded-md" style={{ backgroundColor: palette.neutral }}>
                     <OverviewChart palette={palette} />
                     <div className="absolute" style={{ top: 'calc(50px / 200 * 100% - 8px)', left: 'calc(220px / 400 * 100% - 8px)'}}>
                        <Tooltip text="Peak Performance: $12,450">
                           <div className="w-4 h-4 rounded-full" />
                        </Tooltip>
                     </div>
                  </div>
                </div>
                <div className={`${cardBase} lg:col-span-3 animate-content-enter transition-transform duration-300 hover:-translate-y-1`} style={{ animationDelay: '800ms' }}>
                  <h4 className="text-lg font-semibold font-primary">Recent Sales</h4>
                  <p className="text-sm opacity-60">You made 265 sales this month.</p>
                  <div className="mt-4 space-y-1">
                    <RecentSaleItem name="Olivia Martin" email="olivia.martin@email.com" amount="+$1,999.00" avatarClasses={avatarClasses} />
                    <RecentSaleItem name="Jackson Lee" email="jackson.lee@email.com" amount="+$39.00" avatarClasses={avatarClasses} />
                    <RecentSaleItem name="Isabella Nguyen" email="isabella.nguyen@email.com" amount="+$299.00" avatarClasses={avatarClasses} />
                    <RecentSaleItem name="William Kim" email="will@email.com" amount="+$99.00" avatarClasses={avatarClasses} />
                    <RecentSaleItem name="Sofia Davis" email="sofia.davis@email.com" amount="+$39.00" avatarClasses={avatarClasses} />
                  </div>
                </div>
              </div>
            </main>
          </>
        )}

        {activePreviewPage === 'profile' && (
          <ProfilePage 
            cardBase={cardBase} 
            buttonClasses={buttonClasses} 
            inputClasses={previewConfig.inputClasses || ''} 
            avatarClasses={avatarClasses}
            palette={palette}
          />
        )}

        {activePreviewPage === 'settings' && (
          <SettingsPage 
            cardBase={cardBase} 
            buttonClasses={buttonClasses} 
            inputClasses={previewConfig.inputClasses || ''} 
            tabClasses={tabClasses}
            palette={palette}
          />
        )}

        {activePreviewPage === 'analytics' && (
          <AnalyticsPage 
            cardBase={cardBase} 
            kpiCardBase={kpiCardBase} 
            palette={palette}
          />
        )}
      </div>
    </section>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  styleClass: string;
  animationDelay: number;
  tooltipText: string;
}
const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, Icon, styleClass, animationDelay, tooltipText }) => (
  <Tooltip text={tooltipText}>
    <div className={`${styleClass} animate-content-enter transition-transform duration-300 hover:-translate-y-1 w-full` } style={{ animationDelay: `${animationDelay}ms` }}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h5 className="text-sm font-medium tracking-tight opacity-80">{title}</h5>
        <Icon className="h-4 w-4 opacity-60" />
      </div>
      <div>
        <div className="text-2xl font-bold font-primary">{value}</div>
        <p className="text-xs opacity-60">{change}</p>
      </div>
    </div>
  </Tooltip>
);

interface RecentSaleItemProps {
  name: string;
  email: string;
  amount: string;
  avatarClasses?: string;
}
const RecentSaleItem: React.FC<RecentSaleItemProps> = ({ name, email, amount, avatarClasses }) => (
  <div className="flex items-center p-2 -m-2 rounded-lg transition-colors duration-200 hover:bg-current/5">
    <Tooltip text={name}>
      <div className={`${avatarClasses} flex h-9 w-9 items-center justify-center space-y-0 rounded-full`} style={{ backgroundColor: 'currentColor', opacity: 0.1 }}>
        <span className="text-xs font-medium">{name.split(' ').map(n=>n[0]).join('')}</span>
      </div>
    </Tooltip>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">{name}</p>
      <p className="text-sm opacity-60">{email}</p>
    </div>
    <div className="ml-auto font-medium font-primary">{amount}</div>
  </div>
);

const OverviewChart: React.FC<{ palette: UIStyle['previewConfig']['palette'] }> = ({ palette }) => {
  const chartLineColor = palette.primary || 'currentColor';
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={chartLineColor} stopOpacity={0.4}/>
          <stop offset="95%" stopColor={chartLineColor} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <g transform="translate(0, 10)">
        <path
          d="M0,150 C50,100 80,120 120,80 S180,20 220,50 S300,150 350,120 S400,100 400,100"
          fill="none"
          stroke={chartLineColor}
          strokeWidth="2"
          className="animate-draw-line"
        />
        <path
          d="M0,180 L0,150 C50,100 80,120 120,80 S180,20 220,50 S300,150 350,120 S400,100 400,100 L400,180 Z"
          fill="url(#chartGradient)"
          className="animate-content-enter"
          style={{animationDelay: '0.8s'}}
        />
        <circle cx="220" cy="50" r="4" fill={chartLineColor} className="animate-pulse-dot" />
      </g>
    </svg>
  );
};

// ============================================================================
// Additional Page Components
// ============================================================================

interface ProfilePageProps {
  cardBase: string;
  buttonClasses: string;
  inputClasses: string;
  avatarClasses?: string;
  palette: UIStyle['previewConfig']['palette'];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ cardBase, buttonClasses, inputClasses, avatarClasses, palette }) => (
  <main className="pt-6 animate-content-enter">
    <div className="grid gap-6 md:grid-cols-3">
      <div className={`${cardBase} md:col-span-1`}>
        <div className="text-center">
          <div className={`${avatarClasses} w-24 h-24 mx-auto mb-4 flex items-center justify-center text-2xl font-bold`} 
               style={{ backgroundColor: palette.primary, color: palette.bg }}>
            JD
          </div>
          <h3 className="text-xl font-semibold font-primary">John Doe</h3>
          <p className="text-sm opacity-60 mb-4">Product Designer</p>
          <button className={buttonClasses}>Edit Profile</button>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm opacity-60">Projects</span>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm opacity-60">Followers</span>
            <span className="font-semibold">1.2k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm opacity-60">Following</span>
            <span className="font-semibold">342</span>
          </div>
        </div>
      </div>
      
      <div className={`${cardBase} md:col-span-2`}>
        <h4 className="text-lg font-semibold font-primary mb-4">Personal Information</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input type="text" value="John" className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input type="text" value="Doe" className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value="john.doe@example.com" className={inputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input type="tel" value="+1 (555) 123-4567" className={inputClasses} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea 
              className={`${inputClasses} h-20 resize-none`}
              value="Passionate product designer with 5+ years of experience creating user-centered digital experiences."
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className={buttonClasses}>Save Changes</button>
          <button className={buttonClasses.replace(palette.primary, 'transparent').replace('text-white', `text-[${palette.primary}]`) + ` border border-[${palette.primary}]`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </main>
);

interface SettingsPageProps {
  cardBase: string;
  buttonClasses: string;
  inputClasses: string;
  tabClasses?: UIStyle['previewConfig']['tabClasses'];
  palette: UIStyle['previewConfig']['palette'];
}

const SettingsPage: React.FC<SettingsPageProps> = ({ cardBase, buttonClasses, inputClasses, tabClasses, palette }) => (
  <main className="pt-6 animate-content-enter">
    <div className={`${tabClasses?.container || ''} mb-6`}>
      <nav className="flex space-x-2" aria-label="Settings Tabs">
        <button className={`${tabClasses?.base} ${tabClasses?.active}`}>General</button>
        <button className={`${tabClasses?.base} ${tabClasses?.inactive}`}>Security</button>
        <button className={`${tabClasses?.base} ${tabClasses?.inactive}`}>Notifications</button>
        <button className={`${tabClasses?.base} ${tabClasses?.inactive}`}>Billing</button>
      </nav>
    </div>

    <div className="grid gap-6">
      <div className={cardBase}>
        <h4 className="text-lg font-semibold font-primary mb-4">Appearance</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select className={inputClasses}>
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select className={inputClasses}>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <h4 className="text-lg font-semibold font-primary mb-4">Privacy</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profile Visibility</p>
              <p className="text-sm opacity-60">Make your profile visible to other users</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" defaultChecked />
              <div className="w-10 h-6 rounded-full" style={{ backgroundColor: palette.primary }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm opacity-60">Receive notifications via email</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <h4 className="text-lg font-semibold font-primary mb-4">Danger Zone</h4>
        <div className="space-y-4">
          <div className="p-4 border border-red-500/50 rounded-lg">
            <h5 className="font-medium text-red-400 mb-2">Delete Account</h5>
            <p className="text-sm opacity-60 mb-3">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
);

interface AnalyticsPageProps {
  cardBase: string;
  kpiCardBase: string;
  palette: UIStyle['previewConfig']['palette'];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ cardBase, kpiCardBase, palette }) => (
  <main className="pt-6 animate-content-enter">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <div className={kpiCardBase}>
        <h5 className="text-sm font-medium opacity-80">Page Views</h5>
        <div className="text-2xl font-bold font-primary">124,592</div>
        <p className="text-xs opacity-60">+12.5% from last week</p>
      </div>
      <div className={kpiCardBase}>
        <h5 className="text-sm font-medium opacity-80">Unique Visitors</h5>
        <div className="text-2xl font-bold font-primary">8,429</div>
        <p className="text-xs opacity-60">+8.2% from last week</p>
      </div>
      <div className={kpiCardBase}>
        <h5 className="text-sm font-medium opacity-80">Bounce Rate</h5>
        <div className="text-2xl font-bold font-primary">24.3%</div>
        <p className="text-xs opacity-60">-2.1% from last week</p>
      </div>
      <div className={kpiCardBase}>
        <h5 className="text-sm font-medium opacity-80">Avg. Session</h5>
        <div className="text-2xl font-bold font-primary">3m 42s</div>
        <p className="text-xs opacity-60">+15s from last week</p>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <div className={cardBase}>
        <h4 className="text-lg font-semibold font-primary mb-4">Traffic Sources</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Direct</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-3/5 h-full rounded-full" style={{ backgroundColor: palette.primary }}></div>
              </div>
              <span className="text-sm font-medium">60%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Search</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-1/3 h-full rounded-full" style={{ backgroundColor: palette.accent }}></div>
              </div>
              <span className="text-sm font-medium">25%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Social</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-1/6 h-full bg-gray-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cardBase}>
        <h4 className="text-lg font-semibold font-primary mb-4">Top Pages</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">/dashboard</span>
            <span className="text-sm font-medium">2,847 views</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">/profile</span>
            <span className="text-sm font-medium">1,923 views</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">/settings</span>
            <span className="text-sm font-medium">1,456 views</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">/analytics</span>
            <span className="text-sm font-medium">892 views</span>
          </div>
        </div>
      </div>
    </div>
  </main>
);


export default StylePreview;