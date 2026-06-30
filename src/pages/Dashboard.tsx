import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'es-toolkit';
import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { clearAuthUser, getAuthUser } from '@/src/lib/auth';

// 模拟异步数据请求
async function fetchWelcomeData(): Promise<{ message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: '数据加载完成' };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getAuthUser();
  const [debounceLog, setDebounceLog] = useState<string>('');

  // TanStack Query 示例
  const { data, isLoading } = useQuery({
    queryKey: ['welcome'],
    queryFn: fetchWelcomeData,
  });

  // es-toolkit debounce 示例
  useEffect(() => {
    const debouncedFn = debounce((text: string) => {
      setDebounceLog(`防抖输出: ${text}`);
    }, 300);
    debouncedFn('es-toolkit debounce 已触发');
    return () => debouncedFn.cancel();
  }, []);

  const handleLogout = () => {
    clearAuthUser();
    navigate('/', { replace: true });
  };

  return (
    <div className="flex min-h-[400px] w-[360px] flex-col bg-background">
      {/* 顶部导航栏 */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-sm font-semibold">Bearp Sniper</h1>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            {user?.username}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-3 w-3" />
            退出
          </Button>
        </div>
      </header>

      {/* 主体内容区 */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">欢迎回来</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              你好，<span className="font-medium">{user?.username}</span>！
              欢迎使用 Bearp Sniper 选品采集器。
            </p>

            {/* TanStack Query 示例 */}
            <div className="rounded-md border bg-muted/50 p-3">
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                TanStack Query 示例
              </p>
              {isLoading ? (
                <p className="text-xs text-muted-foreground">加载中...</p>
              ) : (
                <p className="text-xs">{data?.message}</p>
              )}
            </div>

            {/* es-toolkit 示例 */}
            <div className="rounded-md border bg-muted/50 p-3">
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                es-toolkit 示例
              </p>
              <p className="text-xs">{debounceLog}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
