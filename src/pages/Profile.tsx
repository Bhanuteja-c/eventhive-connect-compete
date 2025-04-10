
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { User, Edit, Save, Calendar } from 'lucide-react';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Jamie Smith',
    bio: 'Full-stack developer and hackathon enthusiast. Love solving complex problems and building innovative solutions.',
    email: 'jamie.smith@example.com',
    location: 'San Francisco, CA',
    eventsJoined: 12,
    eventsWon: 3,
    points: 8750,
    avatar: '' // Empty means no custom avatar uploaded yet
  });
  
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const handleEditToggle = () => {
    if (isEditMode) {
      // Save changes
      setProfileData(tempProfileData);
      setIsEditMode(false);
    } else {
      // Enter edit mode
      setTempProfileData({ ...profileData });
      setIsEditMode(true);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setTempProfileData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">My Profile</h2>
              <button 
                onClick={handleEditToggle}
                className="text-eventhive-accent hover:text-eventhive-primary transition-colors"
                aria-label={isEditMode ? "Save profile" : "Edit profile"}
              >
                {isEditMode ? <Save size={20} /> : <Edit size={20} />}
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="h-[150px] w-[150px] rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {(isEditMode ? (avatarPreview || profileData.avatar) : profileData.avatar) ? (
                    <img 
                      src={isEditMode ? (avatarPreview || profileData.avatar) : profileData.avatar} 
                      alt={profileData.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <User size={64} className="text-gray-400" />
                  )}
                </div>
                
                {isEditMode && (
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-eventhive-primary text-white p-2 rounded-full cursor-pointer">
                    <Edit size={16} />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
              
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={tempProfileData.name}
                  onChange={handleChange}
                  className="text-xl font-bold text-center input-primary mb-1"
                />
              ) : (
                <h3 className="text-xl font-bold mb-1">{profileData.name}</h3>
              )}
              
              {isEditMode ? (
                <input
                  type="text"
                  name="location"
                  value={tempProfileData.location}
                  onChange={handleChange}
                  className="text-gray-500 dark:text-gray-400 text-center input-primary"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">{profileData.location}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Bio
                </label>
                {isEditMode ? (
                  <textarea
                    name="bio"
                    value={tempProfileData.bio}
                    onChange={handleChange}
                    className="input-primary mt-1 resize-none h-24"
                  />
                ) : (
                  <p className="mt-1">{profileData.bio}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={tempProfileData.email}
                    onChange={handleChange}
                    className="input-primary mt-1"
                  />
                ) : (
                  <p className="mt-1">{profileData.email}</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium">Dark Mode</span>
                  <div 
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-eventhive-primary' : 'bg-gray-200'}`}
                    onClick={toggleTheme}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats and Events */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-1">{profileData.eventsJoined}</h3>
              <p className="text-gray-500 dark:text-gray-400">Events Joined</p>
            </div>
            
            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-1">{profileData.eventsWon}</h3>
              <p className="text-gray-500 dark:text-gray-400">Events Won</p>
            </div>
            
            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-1">{profileData.points.toLocaleString()}</h3>
              <p className="text-gray-500 dark:text-gray-400">Total Points</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">My Upcoming Events</h2>
            
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                  <div className="h-14 w-14 bg-eventhive-primary rounded-lg flex items-center justify-center text-white mr-4">
                    <Calendar />
                  </div>
                  <div>
                    <h3 className="font-medium">AI Research Challenge</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">May 5-7, 2025</p>
                    <span className="text-xs bg-eventhive-accent-light text-eventhive-primary px-2 py-1 rounded-full mt-1 inline-block">
                      Registered
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
