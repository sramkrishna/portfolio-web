---
title: "Building oneAPI from Source"
date: 2023-12-22T06:08:31
source: "Dev.to"
external_url: "https://dev.to/oneapi/building-oneapi-from-source-c50"
draft: false
---

<h2>
  
  
  Build oneAPI completely from git
</h2>

<p>I'm back!! A few raw posts have been languishing and I decided the end of the year was the perfect time to put them out there. This will be one of three (hopefully).</p>

<p>I'm going to focus on how ￼to build oneAPI from git. This is somewhat of a return to my earlier blog post where I talked about how to build the DPC++ compiler and it included the binary versions of the openCL and level zero run time.</p>

<p>That's all well and good but let's consider how we could build the run time from git completely. The ability to do reproducible builds is going to be important later when we dive into buildimg packaging that is up to date and available on any Linux distro.</p>

<p>The build only supports Intel hardware at this point since level zero doesn't support NVidia or AMD GPUs. If you are looking for such support, you might consider Codeplay's plugins that will allow you to use NVidia and AMD hardware. </p>

<p>These blog pages typically only focus on what we can do from an open source perspective and won't really focus on anything that has binary blobs if we can avoid it.</p>

<p>DISCLAIMER: Please don't use this set up for a production environment. It is not well tested. If you find any problems, please reach out in the comments so that I can help debug and update the blog post appropriately.</p>

<h2>
  
  
  Setting up the build environment
</h2>

<p>I like to use containers which makes it easy to quickly set up and automate using distrobox.</p>

<p>You should be able to use whatever Linux distribution you want as long as you can install distrobox. You can, of course, use a virtual machine to accomplish this. I've used Vagrant successfully.</p>

<p>Assuming that you have distrobox installed - let's get to it.</p>

<p>Decide where you want to have the build for instance: ~/src/oneapi-build.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ distrobox create --image docker.io/library/ubuntu 20.04 --name "oneAPIBuild"
$ distrobox enter oneAPIBuild
</code></pre>

</div>



<p>You should now be in a container running Ubuntu 20.04.</p>

<h3>
  
  
  Install the appropriate packages
</h3>



<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ sudo apt-get install -y build-essential git libssl-dev flex bison libz-dev python3-mako python3-pip automake autoconf libtool pkg-config ruby
</code></pre>

</div>



<p>You will need a recent version of cmake for the builds. The one that comes with 20.04 is too old.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$  wget https://github.com/Kitware/CMake/releases/download/v3.28.1/cmake-3.28.1.tar.gz
$ tar xvfpz cmake-3.28.1.tar.gz
$ cd cmake-3.28.1
$ ./boostrap
$ ./configure
$ make 
$ sudo make install
</code></pre>

</div>



<p>Now you should have everything you need for the build.</p>

<h3>
  
  
  Understanding the oneAPI Build
</h3>

<p>There are a number of prerequisites before you start the build. Here is a graphic of how the oneAPI build is put together.</p>

<p>The order of build is:</p>

<p>1) Intel Graphics Engine and i￼ts relevant prerequisites which consist of:</p>

<ul>
<li>Intel Graphics Compiler (igc)

<ol>
<li>SPIRV Headers</li>
<li>SPIRV Tools</li>
<li>copy of the llvm project</li>
<li>vc-intrinsics</li>
<li>intel graphcis compiler
2) ocl-icd
3) GMMLib
4) NEO - Intel Compute Runtime - NEO is the primary GPU graphics driver and uses OpenCL to talk to the GPU.</li>
</ol>
</li>
<li>Has the following pre-requisites:

<ol>
<li>Intel graphics compiler (IGC)</li>
<li>GMMLib
6) Level Zero
7) DPC++ SYCL Compiler
8) oneTBB Library</li>
</ol>
</li>
</ul>

<p>That's the progression to get the full build going.</p>

<h3>
  
  
  Intel Graphics Engine
</h3>

<p>Let's start building the first prerequisites for the NEO which is the Intel Graphics Engine:<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ mkdir igc-workspace &amp;&amp; cd igc-workspace
$ git clone https://github.com/KhronosGroup/SPIRV-Headers.git --depth 1

$ git clone https://github.com/KhronosGroup/SPIRV-Tools.git --depth 1

$ git clone -b llvmorg-14.0.5 https://github.com/llvm/llvm-project llvm-project --depth 1

$ git clone -b ocl-open-140 https://github.com/intel/opencl-clang llvm-project/llvm/projects/opencl-clang --depth 1

$ git clone -b llvm_release_140 https://github.com/KhronosGroup/SPIRV-LLVM-Translator llvm-project/llvm/projects/llvm-spirv --depth 1

$ git clone https://github.com/intel/vc-intrinsics --depth 1

$ git clone https://github.com/intel/intel-graphics-compiler igc --depth 1

$ mkdir build &amp;&amp; cd build
$ cmake ../igc -DCMAKE_INSTALL_PREFIX="/usr/local"
$ make -j `nproc`
$ sudo make install
</code></pre>

</div>



<p>It should build cleanly. If it doesn't - please check any errors and make sure you have all the prerequisites.</p>

<h3>
  
  
  ocl-icd
</h3>

<p>ocl-icd is an OpenCL loader - and is used to link opencl software when compiling. Make sure you are back in your usual oneapi-build directory.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ pwd
~/src/oneapi-build
$ git clone https://github.com/OCL-dev/ocl-icd --depth 1
$ cd ocl-icd
$ ./bootstrap
$ ./configure
$ make
$ sudo make install
</code></pre>

</div>



<h3>
  
  
  Install GMMLib
</h3>

<p>NEO requires GMMLib as one of its prerequisites so we will build that now.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ pwd
~/src/oneapi-build
$ git clone https://github.com/intel/gmmlib --depth 1
$ cd gmmlib
$ mkdir build
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX="/usr/local"
$ make
$ sudo make install
</code></pre>

</div>



<h3>
  
  
  Install NEO
</h3>

<p>NEO is the Intel Compute Runtime and is necessary for the SYCL based applications to talk to the GPU. Go back to your ~/src/oneapi-build directory.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ pwd 
~/src/oneapi-build # please note this output will be different for you
$ mkdir neo-workspace
$ cd neo-workspace
$ git clone https://github.com/intel/compute-runtime neo –depth 1
$ cd neo
$ mkdir build
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX="/usr/local"
$ make
$ sudo make install
</code></pre>

</div>



<h2>
  
  
  Install level-zero
</h2>

<p>This is the main part of oneAPI and interfaces with NEO or other run times. Since NEO is the only one at the moment - it will only work with Intel devices.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ pwd
~/src/oneapi-build
$ git clone https://github.com/oneapi-src/level-zero --depth 1
$ mkdir build
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX="/usr/local"
$ make
$ sudo make install
</code></pre>

</div>



<h2>
  
  
  Install the DPC++ Compiler
</h2>

<p>Now to build the SYCL Compiler.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ pwd
~/src/oneapi-build
$ mkdir sycl_workspace &amp;&amp; cd sycl_workspace
$ export DPCPP_HOME=`pwd`
$ git clone https://github.com/intel/llvm.git -b sycl --depth 1
$ python3 $DPCPP_HOME/llvm/buildbot/configure.py --cmake-opt CMAKE_BUILD_PREFIX="/usr/local"
$ python3 $DPCPP_HOME/llvm/buildbot/compile.py
</code></pre>

</div>



<h2>
  
  
  Install oneTBB
</h2>

<p>Finally, we need to install oneTBB<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ pwd
~/src/oneapi-build
$ git clone https://github.com/oneapi-src/oneTBB --depth 1
$ cd oneTBB
$ mkdir build
$ cd build
$ cmake .. -DCMAKE_INSTALL_PREFIX="/usr/local"
$ make
$ make install
</code></pre>

</div>



<h2>
  
  
  Set the LD_LIBRARY_PATH
</h2>

<p>We need to make sure that the linker can find the proper libraries. The easiest way is to either set the LD_LIBRARY_PATH in your .bashrc or put it in /etc/environment.<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ export LD_LIBRARY_PATH="/usr/local/lib"
</code></pre>

</div>



<h2>
  
  
  Test the environment
</h2>



<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ cd ~/src
$ mkdir simple-oneapi-app
$ cd simple-oneapi-app
$ cat &gt; simple-oneapi-app.cpp
#include &lt;sycl/sycl.hpp&gt;

int main() {
  // Creating buffer of 4 ints to be used inside the kernel code
  sycl::buffer&lt;sycl::cl_int, 1&gt; Buffer(4);

  // Creating SYCL queue
  sycl::queue Queue;

  // Size of index space for kernel
  sycl::range&lt;1&gt; NumOfWorkItems{Buffer.size()};

  // Submitting command group(work) to queue
  Queue.submit([&amp;](sycl::handler &amp;cgh) {
    // Getting write only access to the buffer on a device
    auto Accessor = Buffer.get_access&lt;sycl::access::mode::write&gt;(cgh);
    // Executing kernel
    cgh.parallel_for&lt;class FillBuffer&gt;(
        NumOfWorkItems, [=](sycl::id&lt;1&gt; WIid) {
          // Fill buffer with indexes
          Accessor[WIid] = (sycl::cl_int)WIid.get(0);
        });
  });

  // Getting read only access to the buffer on the host.
  // Implicit barrier waiting for queue to complete the work.
  const auto HostAccessor = Buffer.get_access&lt;sycl::access::mode::read&gt;();

  // Check the results
  bool MismatchFound = false;
  for (size_t I = 0; I &lt; Buffer.size(); ++I) {
    if (HostAccessor[I] != I) {
      std::cout &lt;&lt; "The result is incorrect for element: " &lt;&lt; I
                &lt;&lt; " , expected: " &lt;&lt; I &lt;&lt; " , got: " &lt;&lt; HostAccessor[I]
                &lt;&lt; std::endl;
      MismatchFound = true;
    }
  }

  if (!MismatchFound) {
    std::cout &lt;&lt; "The results are correct!" &lt;&lt; std::endl;
  }

  return MismatchFound;
}

$ clang++ -fsycl simple-oneapi-app.cpp -o simple-oneapi-app
</code></pre>

</div>



<p>When you run the app you should get "Results are correct!".<br />
</p>

<div class="highlight js-code-highlight">
<pre class="highlight plaintext"><code>$ ./simple-oneapi-app
Results are correct!
</code></pre>

</div>



<p>Now you've successfully built oneAPI from source!</p>

<p>Let me know if you have any issues with the instructions in the comments.</p>

<p>Photo by <a href="https://unsplash.com/@exdigy?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash" rel="noopener noreferrer">Dominik Lückmann</a> on <a href="https://unsplash.com/photos/blue-and-red-cargo-ship-4aOhA4ptIY4?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash" rel="noopener noreferrer">Unsplash</a></p>

[Read full post on Dev.to](https://dev.to/oneapi/building-oneapi-from-source-c50)
