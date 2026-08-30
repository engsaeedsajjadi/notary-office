import React from 'react';

/**
 * نشان پیام‌رسان بله.
 * حباب گفت‌وگو با تیک تأیید — هم‌سبک با بقیه آیکون‌های مجموعه.
 */
export const BaleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.77 1.46 5.24 3.75 6.86v3.49c0 .4.45.63.78.4l3.03-2.13c.79.16 1.61.24 2.44.24 5.52 0 10-3.94 10-8.86S17.52 2 12 2zm-1.1 12.03L7.6 10.74l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.49z" />
    </svg>
);
