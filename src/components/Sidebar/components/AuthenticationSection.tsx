import GoogleLoginButton from '@/components/Auth/GoogleLoginButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { memo } from 'react';
import { SubscriptionStatus } from '../types';

interface AuthenticationSectionProps {
  user: unknown;
  subscriptionStatus: SubscriptionStatus;
  subLoading: boolean;
  onSubscribe: () => void;
}

export const AuthenticationSection = memo<AuthenticationSectionProps>(
  ({ user, subscriptionStatus, subLoading, onSubscribe }) => {
    const { t } = useLanguage();

    const renderSubscriptionStatus = () => {
      if (!user) return null;

      if (subLoading) {
        return (
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-pulse"></span>
            {t('subscription.checking')}
          </span>
        );
      }

      switch (subscriptionStatus) {
        case 'active':
          return (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              {t('subscription.active')}
            </span>
          );
        case 'inactive':
          return (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
              {t('subscription.inactive')}
            </span>
          );
        case 'none':
          return (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
              {t('subscription.none')}
            </span>
          );
        default:
          return null;
      }
    };

    return (
      <div className="pt-4 border-t border-white/20 mb-4">
        <div className="text-center">
          <GoogleLoginButton
            size="small"
            variant="outline"
            className="w-full"
          />
          {user ? (
            <div className="mt-3 flex justify-center min-h-[32px]">
              {renderSubscriptionStatus() as React.ReactNode}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

AuthenticationSection.displayName = 'AuthenticationSection';
