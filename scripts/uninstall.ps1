<#
.SYNOPSIS
  回滚 Houdoku 简体中文汉化。

.DESCRIPTION
  关闭 Houdoku，把 resources\app.asar.bak 恢复为 app.asar。

.PARAMETER AppDir
  Houdoku 安装目录。省略时自动在常见安装位置查找。

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
#>
param(
  [string]$AppDir = ""
)

$ErrorActionPreference = "Stop"

function Find-AppDir {
  $candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\Houdoku"),
    (Join-Path $env:ProgramFiles "Houdoku"),
    (Join-Path ${env:ProgramFiles(x86)} "Houdoku")
  )
  foreach ($c in $candidates) {
    if ($c -and (Test-Path (Join-Path $c "resources\app.asar.bak"))) { return $c }
  }
  return $null
}

if (-not $AppDir) {
  $AppDir = Find-AppDir
  if (-not $AppDir) {
    throw "未找到包含备份 app.asar.bak 的 Houdoku 安装目录，请使用 -AppDir 指定。"
  }
}

$bak = Join-Path $AppDir "resources\app.asar.bak"
$asar = Join-Path $AppDir "resources\app.asar"
if (-not (Test-Path $bak)) {
  throw "备份文件不存在：$bak"
}

$proc = Get-Process -Name Houdoku -ErrorAction SilentlyContinue
if ($proc) {
  Write-Host "正在关闭 Houdoku..."
  $proc | Stop-Process -Force
  Start-Sleep -Seconds 1
}

Copy-Item $bak $asar -Force
Write-Host ""
Write-Host "已恢复原版 app.asar：$asar" -ForegroundColor Green
Write-Host "备份文件仍保留在：$bak"
