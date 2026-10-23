<#
.SYNOPSIS
  安装 Houdoku 简体中文汉化补丁。

.DESCRIPTION
  自动定位 Houdoku 安装目录，备份原始 app.asar 为 app.asar.bak，
  然后写入汉化后的 app.asar。支持自定义安装目录。

.PARAMETER AppDir
  Houdoku 安装目录（包含 Houdoku.exe 与 resources 的目录）。
  省略时自动在常见安装位置查找。

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\install.ps1

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\install.ps1 -AppDir "D:\Apps\Houdoku"
#>
param(
  [string]$AppDir = ""
)

$ErrorActionPreference = "Stop"

# 汉化包 app.asar 的 SHA256，用于完整性校验
$ExpectedSha256 = "1B83C3F292A0C09D2A4455B1E88184F151F149070147C4173E2F485AD4C8EBAF"
$ExpectedVersion = "2.16.0"

function Find-AppDir {
  $candidates = @(
    (Join-Path $env:LOCALAPPDATA "Programs\Houdoku"),
    (Join-Path $env:ProgramFiles "Houdoku"),
    (Join-Path ${env:ProgramFiles(x86)} "Houdoku")
  )
  foreach ($c in $candidates) {
    if ($c -and (Test-Path (Join-Path $c "resources\app.asar"))) { return $c }
  }
  return $null
}

if (-not $AppDir) {
  $AppDir = Find-AppDir
  if (-not $AppDir) {
    throw "未找到 Houdoku 安装目录。请使用 -AppDir 指定，例如：`n  .\install.ps1 -AppDir ""C:\Users\<用户名>\AppData\Local\Programs\Houdoku"""
  }
}

$asar = Join-Path $AppDir "resources\app.asar"
if (-not (Test-Path $asar)) {
  throw "目标目录中没有 resources\app.asar：$AppDir"
}

# 版本检查
$exe = Join-Path $AppDir "Houdoku.exe"
if (Test-Path $exe) {
  $ver = (Get-Item $exe).VersionInfo.FileVersion
  if ($ver -and $ver -notlike "$ExpectedVersion*") {
    Write-Warning "当前 Houdoku 版本为 $ver，本补丁适配 $ExpectedVersion，可能存在兼容性问题。"
  }
  Write-Host "Houdoku 版本：$ver"
}

$patchFile = Join-Path $PSScriptRoot "app.asar"
if (-not (Test-Path $patchFile)) {
  throw "补丁包缺少 app.asar，请确认已完整解压。"
}

# 完整性校验
$actual = (Get-FileHash $patchFile -Algorithm SHA256).Hash
if ($actual -ne $ExpectedSha256) {
  throw "补丁文件校验失败（SHA256 不匹配），文件可能已损坏，请重新下载。"
}

# 关闭正在运行的 Houdoku
$proc = Get-Process -Name Houdoku -ErrorAction SilentlyContinue
if ($proc) {
  Write-Host "正在关闭 Houdoku..."
  $proc | Stop-Process -Force
  Start-Sleep -Seconds 1
}

# 备份原版（只在第一次安装时备份，避免覆盖真正的原版）
$bak = Join-Path $AppDir "resources\app.asar.bak"
if (-not (Test-Path $bak)) {
  Copy-Item $asar $bak
  Write-Host "已备份原版：$bak"
} else {
  Write-Host "已存在备份，跳过备份：$bak"
}

Copy-Item $patchFile $asar -Force
Write-Host ""
Write-Host "汉化补丁安装完成：$asar" -ForegroundColor Green
Write-Host "启动 Houdoku 即可看到中文界面。"
Write-Host "如需回滚，运行 uninstall.ps1。"
