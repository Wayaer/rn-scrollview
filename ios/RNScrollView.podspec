require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name         = "RNScrollView"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.license      = 'MIT'
  s.homepage     = 'n/a'
  s.authors      = package['author']
  s.platforms    = { :ios => "7.0", :tvos => "9.0" }
  s.source       = { :git => "", :tag => s.version }
  s.source_files  = "**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
end
